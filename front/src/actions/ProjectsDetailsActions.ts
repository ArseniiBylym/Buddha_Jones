import { action } from 'mobx';
import * as dateFormat from 'date-fns/format';
import * as dateParse from 'date-fns/parse';
import { unformat } from 'accounting';
import { API, APIPath } from 'fetch';
import { ProjectsDetailsStore } from 'store/AllStores';
import { UsersActions } from '.';
import {
    ProjectDetailsFromApi,
    ProjectCampaignUser,
    CampaignDetails,
    SpotDetails,
    ProjectSpotCreateFromApi,
    ProjectDetailsVersionModalData,
    ProjectDetailsVersionModalUploadStatus,
    VersionStatus, ProjectDetails,
} from 'types/projectDetails';
import { ProjectBoardCampaignPeopleType } from 'routes/Project/Board/Campaign/People/ProjectBoardCampaignPeople';
import { ProjectBoardCampaignWritingOrMusicTeamTypeProp } from 'routes/Project/Board/Campaign/WritingAndMusicTeams';
import { SpotBillingType } from 'types/projectDetailsEnums';
import { ProjectVersionStatus } from '../types/projectVersions';

export class ProjectDetailsActionsClass {
    private fetchAttemptRetry: number = 0;

    @action
    fetchProjectDetails = async (
        projectId: number,
        projectData: {
            projectName?: string; projectPrefix?: string; projectCodeName?: string; clientId?: number; clientName?: string; studioId?: number; studioName?: string
        } = {}
    ): Promise<boolean> => {
        try {
            // Indicate project is being loaded, initialize project object if it doesn't exist yet
            let projectIdMatch = ProjectsDetailsStore.fetchedProjectsIdsFlat.indexOf(projectId);
            if (projectIdMatch !== -1) {
                ProjectsDetailsStore.fetchedProjects[projectIdMatch].loading = true;
                ProjectsDetailsStore.fetchedProjects[projectIdMatch].projectDoesNotExist = false;
                ProjectsDetailsStore.fetchedProjects[projectIdMatch].projectCouldNotBeFetched = false;
            } else {
                ProjectsDetailsStore.fetchedProjects.push({
                    loading: true,
                    projectId,
                    projectName:
                        typeof projectData.projectName !== 'undefined' && projectData.projectName
                            ? projectData.projectName
                            : '',
                    projectPrefix:
                        typeof projectData.projectPrefix !== 'undefined' && projectData.projectPrefix
                            ? projectData.projectPrefix
                            : '',
                    projectCodeName:
                        typeof projectData.projectCodeName !== 'undefined' && projectData.projectCodeName
                            ? projectData.projectCodeName
                            : '',
                    clientId:
                        typeof projectData.clientId !== 'undefined' && projectData.clientId ? projectData.clientId : 0,
                    clientName:
                        typeof projectData.clientName !== 'undefined' && projectData.clientName
                            ? projectData.clientName
                            : '',
                    studioId:
                        typeof projectData.studioId !== 'undefined' && projectData.studioId ? projectData.studioId : 0,
                    studioName:
                        typeof projectData.studioName !== 'undefined' && projectData.studioName
                            ? projectData.studioName
                            : '',
                    projectReleaseDate: null,
                    notes: null,
                    campaigns: [],
                    history: [],
                    projectDoesNotExist: false,
                    projectCouldNotBeFetched: false,
                });
            }

            // Fetch project details
            const project = (await API.getData(APIPath.PROJECT + '/' + projectId)) as ProjectDetailsFromApi;

            // Update project details
            projectIdMatch = ProjectsDetailsStore.fetchedProjectsIdsFlat.indexOf(projectId);
            if (projectIdMatch !== -1) {
                // Stop loading
                ProjectsDetailsStore.fetchedProjects[projectIdMatch].loading = false;

                // Set flat data
                ProjectsDetailsStore.fetchedProjects[projectIdMatch].projectId = project.id;
                ProjectsDetailsStore.fetchedProjects[projectIdMatch].projectPrefix =
                typeof project.projectPrefix !== 'undefined' && project.projectPrefix ? project.projectPrefix : null;
                ProjectsDetailsStore.fetchedProjects[projectIdMatch].projectName =
                    typeof project.projectName !== 'undefined' && project.projectName ? project.projectName : null;
                ProjectsDetailsStore.fetchedProjects[projectIdMatch].projectCodeName =
                    typeof project.projectCode !== 'undefined' && project.projectCode ? project.projectCode : null;
                ProjectsDetailsStore.fetchedProjects[projectIdMatch].clientId = project.customerId;
                ProjectsDetailsStore.fetchedProjects[projectIdMatch].clientName = project.customerName;
                ProjectsDetailsStore.fetchedProjects[projectIdMatch].studioId = project.studioId;
                ProjectsDetailsStore.fetchedProjects[projectIdMatch].studioName = project.studioName;
                ProjectsDetailsStore.fetchedProjects[projectIdMatch].projectReleaseDate =
                    project.projectRelease !== null && project.projectRelease.date
                        ? dateParse(project.projectRelease.date)
                        : null;
                ProjectsDetailsStore.fetchedProjects[projectIdMatch].notes = project.notes;
                ProjectsDetailsStore.fetchedProjects[projectIdMatch].projectDoesNotExist = false;
                ProjectsDetailsStore.fetchedProjects[projectIdMatch].projectCouldNotBeFetched = false;

                // Set history
                ProjectsDetailsStore.fetchedProjects[projectIdMatch].history = project.history.map(h => ({
                    id: unformat(h.id),
                    username: h.username,
                    userFullName: h.fullName,
                    userImage: h.image,
                    message: h.message,
                    createdAt: dateParse(h.createdAt.date),
                }));

                // Set campaigns
                ProjectsDetailsStore.fetchedProjects[projectIdMatch].campaigns = project.campaign.map(c => ({
                    projectCampaignId: c.projectCampaignId,
                    campaignId: c.campaignId,
                    name: c.campaignName,
                    notes: c.note,
                    firstPointOfContactId: c.firstPointOfContactId,
                    writingTeam: c.requestWritingTeam,
                    writingTeamNotes: c.writingTeamNotes,
                    musicTeam: c.requestMusicTeam,
                    musicTeamNotes: c.musicTeamNotes,
                    budget: typeof c.budget !== 'undefined' ? c.budget : null,
                    budgetNotes: typeof c.budgetNote !== 'undefined' ? c.budgetNote : null,
                    graphicsBudgetNote: c.graphicsBudgetNote,
                    dateMaterialsWillBeReceived: null,
                    creativeTeam: c.user,
                    billingTeam: c.billingUser,
                    designTeam: c.designer,
                    editorialTeam: c.editor,
                    additionalTeam: c.additional ? c.additional : [],
                    hidden: false,
                    spots:
                        typeof c.spot !== 'undefined' && c.spot
                            ? c.spot.map(s => ({
                                id: unformat(s.id),
                                name: s.spotName,
                                notes: s.notes,
                                billingNotes: s.billingNote,
                                billingType: s.billingType ? s.billingType : SpotBillingType.Billable,
                                numberOfRevisions: s.revisions,
                                trtId: s.trtId,
                                firstRevisionCost:
                                    typeof s.firstRevisionCost !== 'undefined' && s.firstRevisionCost !== null
                                        ? unformat(s.firstRevisionCost)
                                        : null,
                                graphicsIncluded: Boolean(s.graphicsRevisions),
                                v1InternalDeadline: s.internalDeadline ? dateParse(s.internalDeadline.date) : null,
                                v1ClientDeadline: s.clientDeadline ? dateParse(s.clientDeadline.date) : null,
                                versions:
                                    typeof s.version !== 'undefined' && s.version
                                        ? s.version.map(v => ({
                                            value: v.id,
                                            label: v.versionName,
                                            note: v.versionNote,
                                            status:
                                                v.versionStatusId !== null
                                                    ? {
                                                        id: v.versionStatusId,
                                                        name: v.versionStatusName || '',
                                                    }
                                                    : null,
                                            isCustom: v.custom ? true : false,
                                            editors: (v.editor) ? v.editor : [],
                                            hidden: false,
                                        }))
                                        : [],
                                justAdded: false,
                                hidden: false,
                            }))
                            : [],
                    clientSelected: {
                        id: c.customerId,
                        name: c.customerName
                    },
                    approvedByBilling: c.approvedByBilling,
                    channelId: c.channelId,
                    channelName: c.channelName,
                    customerContact: c.customerContact.map(contact => {
                        return {
                            id: contact.id,
                            customerId: contact.customerId,
                            name: contact.name,
                            title: contact.title,
                            email: contact.email
                        };
                    })
                }));
            }

            // Reset fetch attemps
            this.fetchAttemptRetry = 0;

            return true;
        } catch (error) {
            // Get project index
            const projectIdMatch = ProjectsDetailsStore.fetchedProjectsIdsFlat.indexOf(projectId);

            // Handle various errors
            if (error.message === 'Request failed with status code 400' && projectIdMatch !== -1) {
                ProjectsDetailsStore.fetchedProjects[projectIdMatch].loading = false;
                ProjectsDetailsStore.fetchedProjects[projectIdMatch].projectDoesNotExist = true;
            } else if (this.fetchAttemptRetry > 5 && projectIdMatch !== -1) {
                ProjectsDetailsStore.fetchedProjects[projectIdMatch].loading = false;
                ProjectsDetailsStore.fetchedProjects[projectIdMatch].projectCouldNotBeFetched = true;
                this.fetchAttemptRetry = 0;
            } else {
                setTimeout(() => {
                    this.fetchAttemptRetry++;
                    this.fetchProjectDetails(projectId);
                }, 768);
            }

            throw error;
        }
    };

    @action
    public changeProjectCoreDetails = async (
        id: number,
        values: {
            name?: string;
            codeName?: string;
            prefix?: string;
            releaseDate?: Date | null;
        }
    ): Promise<boolean> => {
        try {
            if (Object.keys(values).length > 0) {
                await API.putData(APIPath.PROJECT + '/' + id, {
                    ...(values.name
                        ? {
                            name: values.name.trim(),
                        }
                        : {}),
                    ...(values.codeName ? { project_code: values.codeName.trim() } : {}),
                    ...(values.prefix ? {project_prefix: values.prefix.trim() } : {}),
                    ...(values.releaseDate
                        ? {
                            project_release:
                                values.releaseDate !== null ? dateFormat(values.releaseDate, 'YYYY-MM-DD') : '',
                        }
                        : {}),
                });

                const projectMatchId = ProjectsDetailsStore.fetchedProjectsIdsFlat.indexOf(id);
                if (projectMatchId !== -1) {
                    if (values.name) {
                        ProjectsDetailsStore.fetchedProjects[projectMatchId].projectName = values.name.trim();
                    }
                    if (values.prefix) {
                        ProjectsDetailsStore.fetchedProjects[projectMatchId].projectPrefix = values.prefix.trim();
                    }
                    if (values.codeName) {
                        ProjectsDetailsStore.fetchedProjects[projectMatchId].projectCodeName = values.codeName.trim();
                    }

                    if (values.releaseDate) {
                        ProjectsDetailsStore.fetchedProjects[projectMatchId].projectReleaseDate = values.releaseDate;
                    }
                }
            }

            return true;
        } catch (error) {
            throw error;
        }
    };

    @action
    public changeProjectCampaignBudget = async (
        projectId: number,
        projectCampaignId: number,
        budget: number | null,
        budgetNotes: string | null
    ): Promise<boolean> => {
        try {
            const campaign = this.findCampaign(projectId, projectCampaignId);
            if (campaign) {
                await API.putData(APIPath.PROJECT_CAMPAIGN + '/' + projectCampaignId, {
                    budget: budget,
                    budget_note: budgetNotes,
                });

                campaign.budget = budget;
                campaign.budgetNotes = budgetNotes;
            }

            return true;
        } catch (error) {
            throw error;
        }
    };

    @action
    public changeProjectCampaignGraphicsBudget = async (
        projectId: number,
        projectCampaignId: number,
        graphicsNotes: string | null
    ): Promise<boolean> => {
        try {
            const campaign = this.findCampaign(projectId, projectCampaignId);
            if (campaign) {
                await API.putData(APIPath.PROJECT_CAMPAIGN + '/' + projectCampaignId, {
                    graphics_budget_note: graphicsNotes,
                });

                campaign.graphicsBudgetNote = graphicsNotes;
            }

            return true;
        } catch (error) {
            throw error;
        }
    };

    @action
    public changeProjectCampaignDateMaterialsWillBeReceived = async (
        projectId: number,
        projectCampaignId: number,
        date: Date | null
    ): Promise<boolean> => {
        try {
            const campaign = this.findCampaign(projectId, projectCampaignId);
            if (campaign) {
                await API.putData(APIPath.PROJECT_CAMPAIGN + '/' + projectCampaignId, {
                    material_receive_date: date !== null ? date.toISOString() : null,
                });

                campaign.dateMaterialsWillBeReceived = date;
            }

            return true;
        } catch (error) {
            throw error;
        }
    };

    @action
    public removeProjectCampaign = async (projectId: number, projectCampaignId: number): Promise<boolean> => {
        try {
            await API.deleteData(APIPath.PROJECT_CAMPAIGN + '/' + projectCampaignId);

            const project = ProjectsDetailsStore.fetchedProjects.find(p => p.projectId === projectId);
            if (project) {
                const campaignIndex = project.campaigns.findIndex(c => c.projectCampaignId === projectCampaignId);
                if (campaignIndex !== -1) {
                    project.campaigns = [
                        ...project.campaigns.slice(0, campaignIndex),
                        ...project.campaigns.slice(campaignIndex + 1),
                    ];
                }
            }

            return true;
        } catch (error) {
            throw error;
        }
    };

    @action
    public changeProjectCampaignDescription = async (
        projectId: number,
        projectCampaignId: number,
        description: string
    ): Promise<boolean> => {
        try {
            await API.putData(APIPath.PROJECT_CAMPAIGN + '/' + projectCampaignId, {
                note: description,
            });

            const campaign = this.findCampaign(projectId, projectCampaignId);
            if (campaign) {
                campaign.notes = description;
            }

            return true;
        } catch (error) {
            throw error;
        }
    };

    @action
    public removeSpotFromProjectCampaign = async (
        projectId: number,
        projectCampaignId: number,
        spotId: number
    ): Promise<boolean> => {
        try {
            const campaign = this.findCampaign(projectId, projectCampaignId);
            if (campaign) {
                const spotIndex = campaign.spots.findIndex(spot => spot.id === spotId);

                if (spotIndex !== -1) {
                    await API.deleteData(APIPath.SPOT + '/' + spotId);

                    campaign.spots = [...campaign.spots.slice(0, spotIndex), ...campaign.spots.slice(spotIndex + 1)];
                }
            }

            return true;
        } catch (error) {
            throw error;
        }
    };

    @action
    public addOrUpdateSpotInProjectCampaign = async (
        projectId: number,
        projectCampaignId: number,
        spotData: SpotDetails
    ): Promise<boolean> => {
        try {
            const spotDataObject = {
                name: spotData.name ? spotData.name.trim() : '',
                notes: spotData.notes && spotData.notes.trim() !== '' ? spotData.notes.trim() : '',
                project_id: projectId,
                project_campaign_id: projectCampaignId,
                revisions: spotData.numberOfRevisions,
                first_revision_cost: spotData.firstRevisionCost,
                billing_type: spotData.billingType,
                billing_note: spotData.billingNotes,
                trt_id: spotData.trtId,
                graphics_revisions: spotData.graphicsIncluded ? 1 : 0,
                internal_deadline:
                    spotData.v1InternalDeadline !== null ? dateFormat(spotData.v1InternalDeadline, 'YYYY-MM-DD') : null,
                client_deadline:
                    spotData.v1ClientDeadline !== null ? dateFormat(spotData.v1ClientDeadline, 'YYYY-MM-DD') : null,
            };

            if (spotDataObject.name === null || spotDataObject.name === '') {
                throw new Error('Spot name is required');
            }

            if (spotData.id !== null && spotData.id > 0) {
                await API.putData(APIPath.SPOT + '/' + spotData.id, spotDataObject);
                const spot = this.findSpot(projectId, projectCampaignId, spotData.id);
                if (spot) {
                    spot.name = spotDataObject.name;
                    spot.notes = spotDataObject.notes;
                    spot.firstRevisionCost = spotData.firstRevisionCost;
                    spot.billingType = spotData.billingType;
                    spot.billingNotes = spotData.billingNotes;
                    spot.graphicsIncluded = spotData.graphicsIncluded;
                    spot.numberOfRevisions = spotData.numberOfRevisions;
                    spot.v1InternalDeadline = spotData.v1InternalDeadline;
                    spot.v1ClientDeadline = spotData.v1ClientDeadline;
                    spot.justAdded = false;
                    spot.trtId = spotData.trtId;
                }
            } else {
                const spot = (await API.postData(APIPath.SPOT, spotDataObject)) as ProjectSpotCreateFromApi;
                const campaign = this.findCampaign(projectId, projectCampaignId);
                if (campaign) {
                    campaign.spots.push({
                        ...spotData,
                        id: unformat(spot.spot_id),
                    });
                }
            }

            return true;
        } catch (error) {
            throw error;
        }
    };

    @action
    public addVersionToProjectCampaignSpot = async (
        projectId: number,
        projectCampaignId: number,
        spotId: number,
        versionId: number,
        versionName: string,
        isCustom: boolean
    ): Promise<boolean> => {
        try {
            const spot = this.findSpot(projectId, projectCampaignId, spotId);
            if (spot) {
                await API.postData(APIPath.ASSIGN_VERSION_TO_SPOT, {
                    spot_id: spotId,
                    version_id: versionId,
                });

                spot.versions.push({
                    value: versionId,
                    label: versionName,
                    isCustom: isCustom,
                    note: null,
                    status: null,
                });
            }

            return true;
        } catch (error) {
            throw error;
        }
    };

    @action
    public removeVersionFromProjectCampaignSpot = async (
        projectId: number,
        projectCampaignId: number,
        spotId: number,
        versionId: number
    ): Promise<boolean> => {
        try {
            const spot = this.findSpot(projectId, projectCampaignId, spotId);
            if (spot) {
                this.changeVersionEditModalUploadStatus('removing');

                const versionIndex = spot.versions.findIndex(v => v.value === versionId);
                if (versionIndex !== -1) {
                    await API.deleteData(APIPath.ASSIGN_VERSION_TO_SPOT + '/' + versionId + '/' + spotId);

                    spot.versions = [...spot.versions.slice(0, versionIndex), ...spot.versions.slice(versionIndex + 1)];
                }
            }

            this.changeVersionEditModalUploadStatus('removing-succes');
            setTimeout(() => {
                if (
                    ProjectsDetailsStore.versionEditModal &&
                    ProjectsDetailsStore.versionEditModal.uploadStatus === 'removing-succes'
                ) {
                    this.closeVersionEditModal();
                }
            }, 768);

            return true;
        } catch (error) {
            this.changeVersionEditModalUploadStatus('removing-error');
            throw error;
        }
    };

    @action
    public changeProjectCampaignSpotVersionData = async (
        versionData: ProjectDetailsVersionModalData,
        userCanEditStatus: boolean,
        userCanEditNote: boolean
    ): Promise<boolean> => {
        try {
            if (ProjectsDetailsStore.versionEditModal) {
                const spot = this.findSpot(versionData.projectId, versionData.projectCampaignId, versionData.spotId);
                if (spot) {
                    const version = spot.versions.find(v => v.value === versionData.versionId);
                    if (version) {
                        ProjectsDetailsStore.versionEditModal.uploadStatus = 'saving';

                        await API.postData(APIPath.ASSIGN_VERSION_TO_SPOT, {
                            spot_id: versionData.spotId,
                            version_id: versionData.versionId,
                            ...(userCanEditStatus
                                ? { version_status_id: versionData.versionStatus ? versionData.versionStatus.id : null }
                                : {}),
                            ...(userCanEditNote
                                ? {
                                    version_note:
                                        versionData.versionNote && versionData.versionNote.trim().length > 0
                                            ? versionData.versionNote.trim()
                                            : null,
                                }
                                : {}),
                        });

                        version.status = versionData.versionStatus;
                        version.note = versionData.versionNote;

                        ProjectsDetailsStore.versionEditModal.uploadStatus = 'saving-success';

                        setTimeout(() => {
                            if (
                                ProjectsDetailsStore.versionEditModal &&
                                ProjectsDetailsStore.versionEditModal.uploadStatus === 'saving-success'
                            ) {
                                ProjectsDetailsStore.versionEditModal.uploadStatus = 'none';
                            }
                        }, 3000);
                    }
                }
            }

            return true;
        } catch (error) {
            if (ProjectsDetailsStore.versionEditModal) {
                ProjectsDetailsStore.versionEditModal.uploadStatus = 'saving-error';
            }

            throw error;
        }
    };

    @action
    public addUserToProjectCampaign = async (
        projectId: number,
        projectCampaignId: number,
        userId: number,
        userFullName: string | null = null,
        userType: ProjectBoardCampaignPeopleType
    ): Promise<boolean> => {
        try {
            const projectIndex = ProjectsDetailsStore.fetchedProjectsIdsFlat.indexOf(projectId);
            if (projectIndex !== -1) {
                const campaignIndex = ProjectsDetailsStore.fetchedProjects[projectIndex].campaigns.findIndex(
                    campaign => campaign.projectCampaignId === projectCampaignId
                );
                if (campaignIndex !== -1) {
                    const campaign = ProjectsDetailsStore.fetchedProjects[projectIndex].campaigns[campaignIndex];

                    const preparedUser: ProjectCampaignUser = {
                        userId: userId,
                        username: '',
                        firstName: '',
                        lastName: '',
                        fullName: userFullName,
                        email: null,
                        image: null,
                        type: '',
                        typeId: 0,
                    };

                    const preparedPostData = {
                        project_id: projectId,
                        project_campaign_id: projectCampaignId,
                        user_id: userId,
                    };

                    UsersActions.fetchUserById(userId, true);

                    if (userType === 'billing') {
                        campaign.billingTeam.push({
                            ...preparedUser,
                            billingRole: null,
                        });

                        await API.postData(APIPath.PROJECT_CAMPAIGN_BILLING_USER, preparedPostData);
                    } else if (userType === 'design') {
                        campaign.designTeam.push(preparedUser);

                        await API.postData(APIPath.PROJECT_CAMPAIGN_DESIGNER, preparedPostData);
                    } else if (userType === 'editorial') {
                        campaign.editorialTeam.push(preparedUser);

                        await API.postData(APIPath.PROJECT_CAMPAIGN_EDITOR, preparedPostData);
                    } else if (userType === 'additional') {
                        campaign.additionalTeam!.push(preparedUser);

                        await API.postData(APIPath.PROJECT_CAMPAIGN_ADDN, preparedPostData);
                    } else if (userType === 'creative') {
                        campaign.creativeTeam.push({
                            ...preparedUser,
                            role: null,
                            roleId: null,
                        });

                        await API.postData(APIPath.PROJECT_CAMPAIGN_PEOPLE, preparedPostData);
                    }
                }
            }

            return true;
        } catch (error) {
            throw error;
        }
    };

    @action
    public removeUserFromProjectCampaign = async (
        projectId: number,
        projectCampaignId: number,
        userId: number,
        userType: ProjectBoardCampaignPeopleType
    ): Promise<boolean> => {
        try {
            const projectIndex = ProjectsDetailsStore.fetchedProjectsIdsFlat.indexOf(projectId);
            if (projectIndex !== -1) {
                const campaignIndex = ProjectsDetailsStore.fetchedProjects[projectIndex].campaigns.findIndex(
                    campaign => campaign.projectCampaignId === projectCampaignId
                );
                if (campaignIndex !== -1) {
                    const campaign = ProjectsDetailsStore.fetchedProjects[projectIndex].campaigns[campaignIndex];
                    let userIndex = -1;

                    if (userType === 'billing') {
                        userIndex = campaign.billingTeam.findIndex(user => user.userId === userId);
                        if (userIndex !== -1) {
                            campaign.billingTeam = [
                                ...campaign.billingTeam.slice(0, userIndex),
                                ...campaign.billingTeam.slice(userIndex + 1),
                            ];
                            await API.deleteData(
                                APIPath.PROJECT_CAMPAIGN_BILLING_USER + '/' + projectCampaignId + '/' + userId
                            );
                        }
                    } else if (userType === 'design') {
                        userIndex = campaign.designTeam.findIndex(user => user.userId === userId);
                        if (userIndex !== -1) {
                            campaign.designTeam = [
                                ...campaign.designTeam.slice(0, userIndex),
                                ...campaign.designTeam.slice(userIndex + 1),
                            ];
                            await API.deleteData(
                                APIPath.PROJECT_CAMPAIGN_DESIGNER + '/' + projectCampaignId + '/' + userId
                            );
                        }
                    } else if (userType === 'editorial') {
                        userIndex = campaign.editorialTeam.findIndex(user => user.userId === userId);
                        if (userIndex !== -1) {
                            campaign.editorialTeam = [
                                ...campaign.editorialTeam.slice(0, userIndex),
                                ...campaign.editorialTeam.slice(userIndex + 1),
                            ];
                            await API.deleteData(
                                APIPath.PROJECT_CAMPAIGN_EDITOR + '/' + projectCampaignId + '/' + userId
                            );
                        }
                    } else if (userType === 'additional') {
                        if (campaign.additionalTeam) {

                            userIndex = campaign.additionalTeam.findIndex(user => user.userId === userId);
                            if (userIndex !== -1) {
                                campaign.additionalTeam = [
                                    ...campaign.additionalTeam.slice(0, userIndex),
                                    ...campaign.additionalTeam.slice(userIndex + 1),
                                ];
                                await API.deleteData(
                                    APIPath.PROJECT_CAMPAIGN_ADDN + '/' + projectCampaignId + '/' + userId
                                );
                            }
                        }
                    } else {
                        userIndex = campaign.creativeTeam.findIndex(user => user.userId === userId);
                        if (userIndex !== -1) {
                            campaign.creativeTeam = [
                                ...campaign.creativeTeam.slice(0, userIndex),
                                ...campaign.creativeTeam.slice(userIndex + 1),
                            ];
                            await API.deleteData(
                                APIPath.PROJECT_CAMPAIGN_PEOPLE + '/' + projectCampaignId + '/' + userId
                            );
                        }
                    }
                }
            }

            return true;
        } catch (error) {
            // TODO: Add error handling!!
            // Current implementation assumes all goes well and user association is removed from database table
            throw error;
        }
    };

    @action
    public changeRoleOfCreativeTeamUserInProjectCampaign = async (
        projectId: number,
        projectCampaignId: number,
        userId: number,
        role: {
            id: number;
            name: string | null;
        } | null = null
    ): Promise<boolean> => {
        try {
            const projectIndex = ProjectsDetailsStore.fetchedProjectsIdsFlat.indexOf(projectId);
            if (projectIndex !== -1) {
                const campaignIndex = ProjectsDetailsStore.fetchedProjects[projectIndex].campaigns.findIndex(
                    campaign => campaign.projectCampaignId === projectCampaignId
                );

                if (campaignIndex !== -1) {
                    const campaign = ProjectsDetailsStore.fetchedProjects[projectIndex].campaigns[campaignIndex];
                    const userIndex = campaign.creativeTeam.findIndex(user => user.userId === userId);

                    if (userIndex !== -1) {
                        const user = campaign.creativeTeam[userIndex];

                        user.role = role !== null ? role.name : null;
                        user.roleId = role !== null ? role.id : null;

                        await API.postData(APIPath.PROJECT_CAMPAIGN_PEOPLE, {
                            project_id: projectId,
                            project_campaign_id: projectCampaignId,
                            user_id: userId,
                            role_id: role !== null ? role.id : null,
                        });
                    }
                }
            }

            return true;
        } catch (error) {
            throw error;
        }
    };

    @action
    public changeProjectCampaignAssignCustomerContact = async (
        projectCampaignId: number,
        contactId: number,
        mode: 'add' | 'remove'
    ): Promise<boolean> => {
        try {

            if (mode === 'add') {
                await API.postData(APIPath.ASSIGN_CONTACT_TO_PROJECT_CAMPAIGN, {
                    project_campaign_id: projectCampaignId,
                    customer_contact_id: contactId
                });
            } else if (mode === 'remove') {
                await API.deleteData(APIPath.ASSIGN_CONTACT_TO_PROJECT_CAMPAIGN + '/' + contactId + '/' + projectCampaignId);
            }

            return true;
        } catch (error) {
            throw error;
        }
    };

    @action
    public changeWritingOrMusicProjectCampaignRequest = async (
        type: ProjectBoardCampaignWritingOrMusicTeamTypeProp,
        projectId: number,
        projectCampaignId: number,
        requestToggle: boolean,
        requestNotes: string | null
    ): Promise<boolean> => {
        try {
            await API.putData(APIPath.PROJECT_CAMPAIGN + '/' + projectCampaignId, {
                [`request_${type}_team`]: requestToggle ? 1 : 0,
                [`${type}_team_notes`]: requestNotes ? requestNotes : null,
            });

            const projectIndex = ProjectsDetailsStore.fetchedProjectsIdsFlat.indexOf(projectId);
            if (projectIndex !== -1) {
                const campaign = ProjectsDetailsStore.fetchedProjects[projectIndex].campaigns.find(
                    c => c.projectCampaignId === projectCampaignId
                );

                if (typeof campaign !== 'undefined') {
                    if (typeof campaign[`${type}Team`] !== 'undefined') {
                        campaign[`${type}Team`] = requestToggle;
                    }

                    if (typeof campaign[`${type}TeamNotes`] !== 'undefined') {
                        campaign[`${type}TeamNotes`] = requestNotes;
                    }
                }
            }

            return true;
        } catch (error) {
            throw error;
        }
    };

    @action
    public openVersionEditModal = (data: ProjectDetailsVersionModalData) => {
        ProjectsDetailsStore.versionEditModal = {
            ...data,
            show: true,
            uploadStatus: 'none',
        };
    };

    @action
    public changeVersionEditModalVersionStatus = (status: VersionStatus | null) => {
        if (ProjectsDetailsStore.versionEditModal) {
            ProjectsDetailsStore.versionEditModal.versionStatus = status;
        }
    };

    @action
    public changeVersionEditModalVersionNote = (note: string) => {
        if (ProjectsDetailsStore.versionEditModal) {
            ProjectsDetailsStore.versionEditModal.versionNote = note;
        }
    };

    @action
    public changeVersionEditModalUploadStatus = (uploadStatus: ProjectDetailsVersionModalUploadStatus) => {
        if (ProjectsDetailsStore.versionEditModal) {
            ProjectsDetailsStore.versionEditModal.uploadStatus = uploadStatus;
        }
    };

    @action
    public closeVersionEditModal = () => {
        if (ProjectsDetailsStore.versionEditModal) {
            ProjectsDetailsStore.versionEditModal.show = false;
        }
    };

    @action
    public dropFilterByVersionStatus = (isHidden: boolean): void => {
        ProjectsDetailsStore.fetchedProjects.forEach((project: ProjectDetails) => {
            project.campaigns = project.campaigns.map((campaign: CampaignDetails) => {
                for (let i = 0; i < campaign.spots.length; i++) {
                    campaign.spots[i].hidden = isHidden;
                    if (campaign.spots[i].versions && campaign.spots[i].versions.length > 0) {
                        for (let k = 0; k < campaign.spots[i].versions.length; k++) {
                            campaign.spots[i].versions[k].hidden = isHidden;
                        }
                    }
                }
                campaign.hidden = isHidden;
                return campaign;
            });
        });
    };

    @action
    public applyFilterByVersionStatus = (selectedVersionStatus: ProjectVersionStatus) => {
        if (selectedVersionStatus && selectedVersionStatus.id) {
            this.dropFilterByVersionStatus(true);
            ProjectsDetailsStore.fetchedProjects.forEach((project: ProjectDetails) => {
                project.campaigns = project.campaigns.map((campaign: CampaignDetails) => {
                    for (let i = 0; i < campaign.spots.length; i++) {
                        if (campaign.spots[i].versions && campaign.spots[i].versions.length > 0) {
                            for (let k = 0; k < campaign.spots[i].versions.length; k++) {
                                if (campaign.spots[i].versions[k] && campaign.spots[i].versions[k].status && (campaign.spots[i].versions[k].status as VersionStatus).id === selectedVersionStatus.id) {
                                    campaign.hidden = false;
                                    campaign.spots[i].hidden = false;
                                    campaign.spots[i].versions[k].hidden = false;
                                }
                            }

                        }
                    }
                    return campaign;
                });
            });
        } else {
            this.dropFilterByVersionStatus(false);
        }
    };

    @action 
    public changeProjectCampaignApproved = async (
        projectCampaignId: number,
        approvedByBilling: boolean,
    ): Promise<boolean> => {
        try {
            await API.putData(APIPath.PROJECT_CAMPAIGN + '/' + projectCampaignId, {
                approved_by_billing: approvedByBilling ? 1 : 0
            });
            return true;
        } catch (error) {
            throw error;
        }
    };

    @action
    public changeProjectCampaignCustomer = async (
        projectCampaignId: number,
        customerId: number,
        approvedByBilling: boolean,
    ): Promise<boolean> => {
        try {
            await API.putData(APIPath.PROJECT_CAMPAIGN + '/' + projectCampaignId, {
                customer_id: customerId,
                approved_by_billing: approvedByBilling ? 1 : 0
            });

            return true;
        } catch (error) {
            throw error;
        }
    };

    private findCampaign = (projectId: number, projectCampaignId: number): CampaignDetails | null => {
        const projectIndex = ProjectsDetailsStore.fetchedProjectsIdsFlat.indexOf(projectId);
        if (projectIndex !== -1) {
            const campaign = ProjectsDetailsStore.fetchedProjects[projectIndex].campaigns.find(
                c => c.projectCampaignId === projectCampaignId
            );

            if (typeof campaign !== 'undefined') {
                return campaign;
            }
        }

        return null;
    };

    private findSpot = (projectId: number, projectCampaignId: number, spotId: number): SpotDetails | null => {
        const campaign = this.findCampaign(projectId, projectCampaignId);
        if (campaign) {
            return campaign.spots.find(spot => spot.id === spotId) || null;
        }

        return null;
    };

}
