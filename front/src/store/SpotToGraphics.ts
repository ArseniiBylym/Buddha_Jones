import { observable, action, computed } from 'mobx';
import { API, APIPath } from 'fetch';

export class SpotToGraphics {
    @observable public isModalOpen: boolean = false;  // change it before commit 
    @observable public isModalQCOpen: boolean = false;  // change it before commit 
    @observable public fetchedSpot: any = '';
    @observable public pending: boolean = false;
    @observable public spotQCNotApproved: boolean = false;
    @observable public spotQCApprovedToSend: boolean = false;
    
    @computed
    public get isFilesEmpty (): boolean {
        if (this.fetchedSpot.graphicsFile.length === 0 || (this.fetchedSpot.graphicsFile.length === 1 && this.fetchedSpot.graphicsFile[0].fileName === '')) {
            return true;
        } else {
            return false;
        }
    }

    @action
    public toggleSpotQCApproved = () => {
        this.spotQCNotApproved = !this.spotQCNotApproved;
    }
    
    @action
    public toggleSpotQCApprovedToSend = () => {
        this.spotQCApprovedToSend = !this.spotQCApprovedToSend;
    
    }

    @action
    public clearApproverCheckboxes = () => {
        this.spotQCApprovedToSend = false;
        this.spotQCNotApproved = false;
    }

    @action
    public getSpotFromApi = async (id: number, modalName: string) => {
        this.pending = true;
        try {
            const response = (await API.getData(APIPath.SPOT_SENT_FOR_GRAPHICS_USER + `/${id}`)) as string[];
            this.fetchedSpot = response;
            this.pending = false;
            if (modalName === 'graphics') {
                this.isModalOpen = true;
            } else if (modalName === 'qc') {
                this.isModalQCOpen = true;
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    @action
    public addFileItem = (name: string, description: string, resend: number, creativeUserId: any = null) => {
        this.fetchedSpot.graphicsFile.push({spotSentId: this.fetchedSpot.spotSentId, fileName: name, fileDescription: description, resend: resend, creativeUserId: creativeUserId});
    }

    @action
    public addEmptyFileItem = () => {
        if (this.fetchedSpot.graphicsFile.length > 0 && this.fetchedSpot.graphicsFile[this.fetchedSpot.graphicsFile.length - 1].fileName === '' ) {
            return;
        }
        this.fetchedSpot.graphicsFile.push({spotSentId: this.fetchedSpot.spotSentId, fileName: '', fileDescription: '', resend: 0, creativeUserId: null});
    }

    @action
    public addFileArray = ( files: string[]) => {
        const filesList = this.fetchedSpot.graphicsFile;
        if (filesList.length > 0 && filesList[filesList.length - 1].fileName === '') {
            filesList[filesList.length - 1].fileName = files[0];
            if (files.length > 1) {
                files.forEach((item, i) => {
                    if ( i === 0 ) {
                        return;
                    }
                    this.addFileItem(item, '', 0, null);
                });
            }
        } else {
            files.forEach((item, i) => {
                this.addFileItem(item, '', 0, null);
            });
        }
    }

    @action
    public removeFileItem = (index: number) => {
        let list = this.fetchedSpot.graphicsFile.slice().filter((item, i) => {
            return index !== i;
        });
        this.fetchedSpot.graphicsFile = list;
    }

    @action
    public setFileName = (index: number, value: string) => {
        this.fetchedSpot.graphicsFile[index].fileName = value;
    }

    @action
    public setFileDescription = (index: number, value: string) => {
        this.fetchedSpot.graphicsFile[index].fileDescription = value;
    }

    @action
    public setFileResend = (index: number) => {
        this.fetchedSpot.graphicsFile[index].resend = this.fetchedSpot.graphicsFile[index].resend === 0 ? 1 : 0;
    }

    @action
    public toggleModal = () => {
        this.isModalOpen = !this.isModalOpen;
    }

    @action
    public toggleQCModal = () => {
        this.isModalQCOpen = !this.isModalQCOpen;
    }

    @action 
    public clearStorage = () => {
        this.fetchedSpot.graphicsFile = [];
    }

    @action
    public changeEDLApi = async (spotSentId, index) => {
        const body = {
            graphics_status_id: 3,
        };
        try {
        //    await API.putJSONData(APIPath.SPOT_SENT_FOR_GRAPHICS_USER + '/' + spotSentId, body);
           await API.putData(APIPath.SPOT_SENT_FOR_GRAPHICS_USER + '/' + spotSentId, body);
        } catch (error) {
            throw (error);
        }
    }

    @action
    public sendFiles = async (withGraphicsStatus, completedCheckboxStatus, toEDL) => {
        let files = this.fetchedSpot.graphicsFile.map(file => {
            return {
                file_name: file.fileName,
                file_description: file.fileDescription,
                resend: file.resend,
            };
        });
        const body = {
            graphics_status_id: completedCheckboxStatus ? 4 : toEDL ? 2 : 1,
            no_graphics: withGraphicsStatus ? 1 : 0,
            graphics_file: JSON.stringify(files),
        };
        try {
            // await API.putJSONData(APIPath.SPOT_SENT_FOR_GRAPHICS_USER + '/' + this.fetchedSpot.spotSentId, body);
            await API.putData(APIPath.SPOT_SENT_FOR_GRAPHICS_USER + '/' + this.fetchedSpot.spotSentId, body);
            this.toggleModal();
        } catch (error) {
            throw (error);
        }
    }

    @action
    public changeQCApi = async (note: string) => {
        const body: any = {
            line_status_id: 4,
        };
        if (this.spotQCApprovedToSend) {
            body.line_status_id = 5;
            body.qc_approved = 1;
        }
        if (this.spotQCNotApproved) {
            body.line_status_id = 3;
            body.qc_approved = 0;
        } 
        if (this.spotQCNotApproved && note && note.length > 0) {
            body.qc_note = note;
        }
        try {
           await API.putData(APIPath.SPOT_SENT_FOR_GRAPHICS_USER + '/' + this.fetchedSpot.spotSentId, body);
            this.toggleQCModal();
        } catch (error) {
            throw (error);
        }
    }
}
