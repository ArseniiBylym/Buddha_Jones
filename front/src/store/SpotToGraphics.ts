import { observable, action, computed } from 'mobx';
import { API, APIPath } from 'fetch';

export class SpotToGraphics {
    @observable public isModalOpen: boolean = false;  // change it before commit 
    @observable public fetchedSpot: any = '';
    @observable public pending: boolean = false;

    @computed
    public get isFilesEmpty (): boolean {
        if (this.fetchedSpot.graphicsFile.length === 0 || (this.fetchedSpot.graphicsFile.length === 1 && this.fetchedSpot.graphicsFile[0].fileName === '')) {
            return true;
        } else {
            return false;
        }
    }
    
    @action
    public getSpotFromApi = async (id: number) => {
        this.pending = true;
        try {
            // const response = (await API.getData(APIPath.SPOT_SENT_FOR_GRAPHICS_USER + `/${id}/offset=0&length=999999999`)) as string[];
            const response = (await API.getData(APIPath.SPOT_SENT_FOR_GRAPHICS_USER + `/${id}`)) as string[];
            this.fetchedSpot = response;
            this.pending = false;
            this.isModalOpen = true;
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
    public clearStorage = () => {
        this.fetchedSpot.graphicsFile = [];
    }

    @action
    public sendFiles = async (withGraphicsStatus, completedCheckboxStatus) => {
        // console.log(this.fetchedSpot.graphicsFile);
        let files = this.fetchedSpot.graphicsFile.map(file => {
            return {
                file_name: file.fileName,
                file_description: file.fileDescription,
                resend: file.resend,
            };
        });
        const body = {
            no_graphics: withGraphicsStatus ? 1 : 0,
            graphics_status_id: completedCheckboxStatus ? 1 : 0,
            graphics_file: files,
        };
        // console.log(body);
        try {
            const response = await API.putJSONData(APIPath.SPOT_SENT_FOR_GRAPHICS_USER + '/' + this.fetchedSpot.spotSentId, JSON.stringify(body));
            // console.log(response);
            this.toggleModal();
        } catch (error) {
            // console.log(error);
            throw (error);
        }
    }

}
