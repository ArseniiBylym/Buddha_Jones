<?php
/**
 * Global Configuration Override
 *
 * You can use this file for overriding configuration values from modules, etc.
 * You would place values in here that are agnostic to the environment and not
 * sensitive to security.
 *
 * @NOTE: In practice, this file will typically be INCLUDED in your source
 * control, so do not include passwords or other sensitive information in this
 * file.
 */

return array(
    'db' => array(
        'driver' => 'Pdo',
// 'dsn' => 'mysql:dbname=wingman;host=wingman-db.my.phpcloud.com',
        'driver_options' => array(
            PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\''
        ),
    ),
    'service_manager' => array(
        'factories' => array(
            'Zend\Db\Adapter\Adapter'
            => 'Zend\Db\Adapter\AdapterServiceFactory',
        ),
        /* Moved to Auth module to allow to be replaced by Doctrine or other.
        // added for Authentication and Authorization. Without this each time we have to create a new instance.
        // This code should be moved to a module to allow Doctrine to overwrite it
        'aliases' => array( // !!! aliases not alias
            'Zend\Authentication\AuthenticationService' => 'my_auth_service',
        ),
        'invokables' => array(
            'my_auth_service' => 'Zend\Authentication\AuthenticationService',
        ),
        */
    ),

    'static_salt' => 'hZ6U351C25YX950I72sAtn7R31mYU6f684D259D47eIJ5lg2sldu8dj', // was moved from module.config.php here to allow all modules to use it

   'jwt_config' => array(
        'issuer' => 'Buddha Jones Portal',
        'audience' => 'http://buddha.redidemo.com',
        'jwt_secret' => '7599P4k668cF88L41vyDg6725Q9J228z89Kd758G8520M15t01r3ac70f97C8GXyf8Fv8klKS1200U9vHF69LUW3p6cFfh381cc922S0jk79T0W8e64ANHy5Fn512hhg3903386Zp0HT3CzNVrJW3E24U0KcwPE485ewf2Gx2C442S0T8l30LGX6z09l7m6zaWNm8617hO42iwb411hY51d598P9fj7mt7Yr86acnp1bur59ujI72nd9J146O0DodTLkbJWrksSosFVbfHzXTVqhQYhlsFaLMjkICdQYeBJVfHhWmGlEvsVAlngUQDcpCwPgKtqZcitrPKnqkvYglLvMpDlIVBdQtZQNNsFGVLbpRHBBQSiJmEbJSVJoapulqpdzTFUVHfshaPrQBEZYJVgowuFJHAcCXGPpJWYjYzDSsvIEIsCYAJWEQYTXxZImPrhsSrhrhXsnsSMEwcSnInIiWUpmuUswXGBEXEVArgdcNxxnnyoeiyYiJtcaluvUKsTLUpTALDIlXULxrmcfwHYNHOqrNUXVZQalUb',
    ),
   
    'directory_path' => array(
        'profile_image' => getcwd() . '/public/thumb/profile_image/',
        'temp_profile_image' => getcwd() . '/data/temp_profile_image/',
        'spot_sent_spec_sheet' => getcwd() . '/public/spec_sheet/',
    ),
    'site_url' => 'http://buddhajonesapi.localhost/',
    'email' => array(
        'from' => 'rizwna.kader@indydutch.com'
    )
);
