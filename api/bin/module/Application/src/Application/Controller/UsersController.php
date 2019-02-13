<?php

namespace Application\Controller;

use Application\Entity\RediUser;
use Zend\View\Model\JsonModel;

class UsersController extends CustomAbstractActionController
{
    /**
     * Min length of auto generated password
     *
     * @var integer
     */
    protected $_passwordMinLength = 10;
    /**
     * Max length of auto generate password
     *
     * @var integer
     */
    protected $_passwordMaxLength = 15;

    public function getList()
    {
        $userAccess = $this->_usersRepo->getUserAccessPermission($this->_user_type_id);
        $class = trim($this->getRequest()->getQuery('class', ''));
        $ids = trim($this->getRequest()->getQuery('ids', ''));
        $type = trim($this->getRequest()->getQuery('type', ''));
        $search = trim($this->getRequest()->getQuery('search', ''));
        $page = (int) trim($this->getRequest()->getQuery('page', 0));
        $getExtraInfo = (int) trim($this->getRequest()->getQuery('get_extra_info', 0));
        $length = (int) trim($this->getRequest()->getQuery('length', 10));
        $offset = (int) trim($this->getRequest()->getQuery('offset', ($page - 1) * $length));
        $offset = ($offset >= 0) ? $offset : 0;

        $idsArr = (array) json_decode($ids, true);
        $classArr = (array) json_decode($class, true);
        $typeArr = (array) json_decode($type, true);

        if (!count($classArr) && $class) {
            $classArr = [$class];
        }

        $userAccess = array_merge($userAccess, array('get_extra_info' => $getExtraInfo));

        $users = $this->_usersRepo->searchUser($search, $idsArr, $classArr, $typeArr, $offset, $length, $userAccess);
        $userCount = $this->_usersRepo->searchCount($search, $idsArr, $classArr, $typeArr);

        foreach ($users as &$row) {
            if ($row['image']) {
                $row['image'] = $this->_siteUrl . 'thumb/profile_image/' . $row['image'];
            }
        }

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'total_count' => $userCount,
            'object_count' => count($users),
            'offset' => $offset,
            'length' => $length,
            'page' => floor($offset / $length) + 1,
            'totalPages' => ceil($userCount / $length),
            'data' => $users,
        );

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function get($id)
    {
        $user = $this->getSingle($id);

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'data' => $user,
        );

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function create($data)
    {
        $data = $this->paramNameProxy($data);

        $userAccess = $this->_usersRepo->getUserAccessPermission($this->_user_type_id);

        if ($userAccess['can_edit']) {
            $userName = trim(isset($data['username']) ? $data['username'] : '');
            $password = trim(isset($data['password']) ? $data['password'] : '');
            $generatePassword = (int) trim(isset($data['generate_password']) ? $data['generate_password'] : 0);
            $firstName = trim(isset($data['first_name']) ? $data['first_name'] : '');
            $lastName = trim(isset($data['last_name']) ? $data['last_name'] : '');
            $nickName = trim(isset($data['nick_name']) ? $data['nick_name'] : '');
            $initials = trim(isset($data['initials']) ? $data['initials'] : '');
            $email = trim(isset($data['email']) ? $data['email'] : '');
            $typeId = (int) (isset($data['type_id']) ? $data['type_id'] : 0);
            $status = (int) trim(isset($data['status']) ? $data['status'] : 1);
            $hourlyRate = isset($data['hourly_rate']) ? trim($data['hourly_rate']) : null;
            $salaryType = isset($data['salary_type']) ? trim($data['salary_type']) : null;
            $salaryAmount = isset($data['salary_amount']) ? trim($data['salary_amount']) : null;
            $minHour = isset($data['min_hour']) ? trim($data['min_hour']) : null;
            $image = isset($data['image']) ? $data['image'] : null;

            // if generate password is selected
            if ($generatePassword) {
                $password = $this->_commonRepo->generateRandomString($this->_passwordMinLength, $this->_passwordMaxLength);
            }

            if ($userName && ($firstName || $lastName) && $email && $password && $typeId) {
                $userNameCheck = $this->_userRepository->findOneBy(array('username' => $userName));
                $emailCheck = $this->_userRepository->findOneBy(array('email' => $email));

                if (!$userNameCheck) {
                    if (!$emailCheck) {
                        $user = new RediUser();
                        $user->setUsername($userName);
                        $user->setFirstName($firstName);
                        $user->setLastName($lastName);
                        $user->setNickName($nickName);
                        $user->setInitials($initials);
                        $user->setEmail($email);
                        $user->setTypeId($typeId);
                        $user->setStatus($status);
                        $user->setPassword(md5($password));
                        $user->setCreatedDate(new \DateTime('now'));

                        $user->setHourlyRate($hourlyRate);
                        $user->setSalaryType($salaryType);
                        $user->setSalaryAmount($salaryAmount);
                        $user->setMinHour($minHour);

                        $this->_em->persist($user);
                        $this->_em->flush();

                        $userId = $user->getId();

                        $this->_em->flush();

                        if ($image) {
                            try {
                                $uploadedImage = $this->_save_base64_image($image, $userId, $this->_tempProfileImagePath);

                                if ($uploadedImage) {
                                    $tempImage = $this->_tempProfileImagePath . $uploadedImage;

                                    if (file_exists($tempImage)) {
                                        $imageExt = $this->_resizeImage($tempImage, $this->_profileImagePath . $userId, 128, 128);
                                        unlink($this->_tempProfileImagePath . $uploadedImage);

                                        $user->setImage($userId . '.' . $imageExt);
                                        $this->_em->flush();
                                    }
                                }
                            } catch (\Exception $e) {

                            }
                        }

                        $data = $this->getSingle($userId);
                        $data['user_id'] = $userId;

                        $this->sendUserCreateEmail($userId, $password);

                        $response = array(
                            'status' => 1,
                            'message' => 'User created successfully',
                            'data' => $data,
                        );
                    } else {
                        $response = array(
                            'status' => 0,
                            'message' => 'Email address already exists',
                        );
                    }
                } else {
                    $response = array(
                        'status' => 0,
                        'message' => 'User name already exists',
                    );
                }

            } else {
                $response = array(
                    'status' => 0,
                    'message' => 'Please provide required data (username, first_name, last_name, password, email, type_id (user type id))',
                );
            }
        } else {
            $response = array(
                'status' => 0,
                'message' => 'User does not have access to change this data.',
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function update($id, $data)
    {
        $data = $this->paramNameProxy($data);

        $password = isset($data['password']) ? $data['password'] : null;
        $generatePassword = (int) trim(isset($data['generate_password']) ? $data['generate_password'] : 0);
        $oldPassword = isset($data['old_password']) ? $data['old_password'] : null;
        $firstName = isset($data['first_name']) ? $data['first_name'] : null;
        $lastName = isset($data['last_name']) ? $data['last_name'] : null;
        $nickName = isset($data['nick_name']) ? $data['nick_name'] : null;
        $initials = isset($data['initials']) ? $data['initials'] : null;
        $email = isset($data['email']) ? $data['email'] : null;
        $typeId = isset($data['type_id']) ? (int) ($data['type_id']) : null;
        $status = isset($data['status']) ? (int) $data['status'] : null;
        $hourlyRate = isset($data['hourly_rate']) ? trim($data['hourly_rate']) : null;
        $salaryType = isset($data['salary_type']) ? trim($data['salary_type']) : null;
        $salaryAmount = isset($data['salary_amount']) ? trim($data['salary_amount']) : null;
        $minHour = isset($data['min_hour']) ? trim($data['min_hour']) : null;
        $image = isset($data['image']) ? $data['image'] : null;

        $userAccess = $this->_usersRepo->getUserAccessPermission($this->_user_type_id);

        // if generate password is selected
        if ($generatePassword) {
            $password = $this->_commonRepo->generateRandomString($this->_passwordMinLength, $this->_passwordMaxLength);
        }

        if ($id && ($id == $this->_user_id || $userAccess['can_edit'])) {
            $emailCheck = $this->_userRepository->findOneBy(array('email' => $email));

            if (!$email || !$emailCheck || ($emailCheck && $emailCheck->getId() == $id)) {
                $user = $this->_userRepository->find($id);

                if ($user) {
                    if ($id == $this->_user_id && $password && !$oldPassword) {
                        $response = array(
                            'status' => 0,
                            'message' => 'Please provide current password.',
                        );
                    } else {
                        if ($id == $this->_user_id && $password && md5($oldPassword) != $user->getPassword()) {
                            $response = array(
                                'status' => 0,
                                'message' => 'Current password does not match.',
                            );
                        } else {
                            if ($firstName) {
                                $user->setFirstName($firstName);
                            }

                            if ($lastName) {
                                $user->setLastName($lastName);
                            }

                            if ($nickName) {
                                $user->setNickName($nickName);
                            }

                            if ($initials) {
                                $user->setInitials($initials);
                            }

                            if ($email) {
                                $user->setEmail($email);
                            }

                            if ($password) {
                                $user->setPassword(md5($password));
                            }

                            if ($userAccess['can_edit']) {
                                if ($typeId) {
                                    $user->setTypeId($typeId);
                                }

                                if ($status !== null) {
                                    $user->setStatus($status);
                                }

                                if ($hourlyRate) {
                                    $user->setHourlyRate($hourlyRate);
                                }

                                if ($salaryType) {
                                    $user->setSalaryType($salaryType);
                                }

                                if ($salaryAmount) {
                                    $user->setSalaryAmount($salaryAmount);
                                }

                                if ($minHour) {
                                    $user->setMinHour($minHour);
                                }
                            }

                            if ($image) {
                                try {
                                    $uploadedImage = $this->_save_base64_image($image, $user->getId(), $this->_tempProfileImagePath);

                                    if ($uploadedImage) {
                                        $tempImage = $this->_tempProfileImagePath . $uploadedImage;

                                        if (file_exists($tempImage)) {
                                            // delete current image (if exists)
                                            if ($user->getImage()) {
                                                if (file_exists($this->_profileImagePath . $user->getImage())) {
                                                    unlink($this->_profileImagePath . $user->getImage());
                                                }
                                            }
                                            $imageExt = $this->_resizeImage($tempImage, $this->_profileImagePath . $user->getId(), 128, 128);
                                            unlink($this->_tempProfileImagePath . $uploadedImage);

                                            $user->setImage($user->getId() . '.' . $imageExt);
                                            $this->_em->flush();
                                        }
                                    }
                                } catch (\Exception $e) {
                                }
                            }
                            $this->_em->persist($user);
                            $this->_em->flush();

                            $updatedUser = $this->getSingle($id);

                            if ($password) {
                                $this->sendUserUpdateEmail($id, $password);
                            }

                            $response = array(
                                'status' => 1,
                                'message' => 'User updated successfully',
                                'data' => $updatedUser,
                            );
                        }
                    }
                } else {
                    $response = array(
                        'status' => 0,
                        'message' => 'User does not exist.',
                    );
                }
            } else {
                $response = array(
                    'status' => 0,
                    'message' => 'Email address already exists',
                );
            }
        } else {
            $response = array(
                'status' => 0,
                'message' => 'User does not have access to change this data.',
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function delete($id)
    {
        $userAccess = $this->_usersRepo->getUserAccessPermission($this->_user_type_id);

        if ($userAccess['can_edit']) {
            $user = $this->_userRepository->find($id);

            if ($user) {
                $this->_em->remove($user);
                $this->_em->flush();

                $response = array(
                    'status' => 0,
                    'message' => 'User deleted',
                );
            } else {
                $response = array(
                    'status' => 0,
                    'message' => 'User does not exist',
                );
            }
        } else {
            $response = array(
                'status' => 0,
                'message' => 'User does not have access to change this data.',
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    private function getSingle($id)
    {
        $getExtraInfo = (int) $this->getRequest()->getQuery('get_extra_info', 0);

        $userAccess = $this->_usersRepo->getUserAccessPermission($this->_user_type_id);
        $user = $this->_usersRepo->getUser($id, array_merge($userAccess, array('get_extra_info' => $getExtraInfo)));

        return $user;
    }

    private function _save_base64_image($base64_image_string, $output_file_without_extentnion, $path_with_end_slash = "")
    {
        //usage:  if( substr( $img_src, 0, 5 ) === "data:" ) {  $filename=save_base64_image($base64_image_string, $output_file_without_extentnion, getcwd() . "/application/assets/pins/$user_id/"); }
        //
        //data is like:    data:image/png;base64,asdfasdfasdf
        $splited = explode(',', substr($base64_image_string, 5), 2);

        if (count($splited) < 2) {
            return null;
        }

        $mime = $splited[0];
        $data = $splited[1];

        $mime_split_without_base64 = explode(';', $mime, 2);
        $mime_split = explode('/', $mime_split_without_base64[0], 2);
        if (count($mime_split) == 2) {
            $extension = $mime_split[1];
            if ($extension == 'jpeg') {
                $extension = 'jpg';
            }

            //if($extension=='javascript')$extension='js';
            //if($extension=='text')$extension='txt';
            $output_file_with_extentnion = $output_file_without_extentnion . '.' . $extension;
        }
        file_put_contents($path_with_end_slash . $output_file_with_extentnion, base64_decode($data));
        return $output_file_with_extentnion;
    }

    private function _resizeImage($path, $newPath, $newWidth, $newHeight)
    {
        $type = explode(".", $path);
        $ext = strtolower($type[sizeof($type) - 1]);
        $ext = (!in_array($ext, array("jpeg", "png", "gif"))) ? "jpeg" : $ext;

        //get image size
        $size = getimagesize($path);
        $width = $size[0];
        $height = $size[1];

        //get source image
        $func = "imagecreatefrom" . $ext;
        $source = $func($path);

        //setting default values

        $new_width = $newWidth;
        $new_height = $newHeight;
        $k_w = 1;
        $k_h = 1;
        $dst_x = 0;
        $dst_y = 0;
        $src_x = 0;
        $src_y = 0;

        //selecting width and height
        //        if (!isset ($_GET["width"]) && !isset ($_GET["height"])) {
        //            $new_height = $height;
        //            $new_width = $width;
        //        } else if (!isset ($_GET["width"])) {
        //            $new_height = $_GET["height"];
        //            $new_width = ($width * $_GET["height"]) / $height;
        //        } else if (!isset ($_GET["height"])) {
        //            $new_height = ($height * $_GET["width"]) / $width;
        //            $new_width = $_GET["width"];
        //        } else {
        //            $new_width = $_GET["width"];
        //            $new_height = $_GET["height"];
        //        }

        //secelcting_offsets

        if ($new_width > $width) //by width
        {
            $dst_x = ($new_width - $width) / 2;
        }
        if ($new_height > $height) //by height
        {
            $dst_y = ($new_height - $height) / 2;
        }
        if ($new_width < $width || $new_height < $height) {
            $k_w = $new_width / $width;
            $k_h = $new_height / $height;

            if ($new_height > $height) {
                $src_x = ($width - $new_width) / 2;
            } else if ($new_width > $width) {
                $src_y = ($height - $new_height) / 2;
            } else {
                if ($k_h > $k_w) {
                    $src_x = round(($width - ($new_width / $k_h)) / 2);
                } else {
                    $src_y = round(($height - ($new_height / $k_w)) / 2);
                }
            }
        }
        $output = imagecreatetruecolor($new_width, $new_height);

        //to preserve PNG transparency
        if ($ext == "png") {
            //saving all full alpha channel information
            imagesavealpha($output, true);
            //setting completely transparent color
            $transparent = imagecolorallocatealpha($output, 0, 0, 0, 127);
            //filling created image with transparent color
            imagefill($output, 0, 0, $transparent);
        }

        imagecopyresampled(
            $output,
            $source,
            $dst_x,
            $dst_y,
            $src_x,
            $src_y,
            $new_width - 2 * $dst_x,
            $new_height - 2 * $dst_y,
            $width - 2 * $src_x,
            $height - 2 * $src_y
        );
        //free resources
        ImageDestroy($source);

        //output image
        //        header('Content-Type: image/' . $ext);
        $func = "image" . $ext;

        if (file_exists($newPath . '.' . $ext)) {
            unlink($newPath . '.' . $ext);
        }

        $func($output, $newPath . '.' . $ext);

        //free resources
        ImageDestroy($output);

        return $ext;
    }

    public function sendUserCreateEmail($userId, $password)
    {
        $user = $this->getSingle($userId);

        if ($user) {
            $data = array(
                'to' => $user['email'],
                'subject' => 'User account created',
            );

            $templateName = 'user-account-create';

            $templateData = array(
                'fullName' => $user['fullName'],
                'username' => $user['username'],
                'email' => $user['email'],
                'password' => $password,
            );

            $this->_commonRepo->sendEmail($data, $templateName, $templateData);
        }
    }

    public function sendUserUpdateEmail($userId, $password)
    {
        $user = $this->getSingle($userId);

        if ($user) {
            $data = array(
                'to' => $user['email'],
                'subject' => 'User account updated',
            );

            $templateName = 'user-account-update';

            $templateData = array(
                'fullName' => $user['fullName'],
                'username' => $user['username'],
                'email' => $user['email'],
                'password' => $password,
            );

            $this->_commonRepo->sendEmail($data, $templateName, $templateData);
        }
    }

    public function paramNameProxy($data)
    {
        $proxy = array(
            'first_name' => 'firstName',
            'last_name' => 'lastName',
            'generate_password' => 'generatePassword',
            'nick_name' => 'nickName',
            'type_id' => 'typeId',
            'hourly_rate' => 'hourlyRate',
            'salary_type' => 'salaryType',
            'salary_amount' => 'salaryAmount',
            'min_hour' => 'minHour',
        );

        foreach ($proxy as $key => $value) {
            if (isset($data[$value])) {
                $data[$key] = $data[$value];
            }
        }

        return $data;
    }

}
