import { observable, action, computed, reaction } from 'mobx';
import { API, APIPath } from 'fetch';

export class SpotToGraphics {
    @observable public isModalOpen: boolean = false;  // change it before commit 
    @observable public currentSpot: any = {};

    @observable public date: any = '';
    @observable public files: any[] = [];
    @observable public fetchedSpot: any = '';

    @action 
    public setDate = (date) => {
        this.date = date;
    }

    @computed
    public get isFilesEmpty (): boolean {
        if (this.files.length === 0 || (this.files.length === 1 && this.files[0].name === '')) {
            return true;
        } else {
            return false;
        }
    }
    
    // @action
    // public fetchStudiosInitialsLetters = async (): Promise<string[]> => {
    //     try {
    //         StudiosStore.existingClientsInitials.loading = true;

    //         const response = (await API.getData(APIPath.STUDIO_FIRST_LETTERS)) as string[];
    //         StudiosStore.existingClientsInitials.letters = response;

    //         return response;
    //     } catch (error) {
    //         throw error;
    //     } finally {
    //         StudiosStore.existingClientsInitials.loading = false;
    //     }
    // };

    @action
    public getSpotFromApi = async (id: number) => {
        try {
            const response = (await API.getData(APIPath.SPOT_SENT_FOR_GRAPHICS_USER + `/${id}/offset=0&length=999999999`)) as string[];
            this.fetchedSpot = response;
            console.log(response);
            return response;
        } catch (error) {
            throw error;
        }
    }

    @action
    public addFileItem = (name: string, description: string, resend: boolean) => {
        this.files.push({name: name, description: description, resend: resend});
    }

    @action
    public addEmptyFileItem = () => {
        if (this.files.length > 0 && this.files[this.files.length - 1].name === '' ) {
            return;
        }
        this.files.push({name: '', description: '', resend: false});
    }

    @action
    public addFileArray = (files: string[]) => {
        if (this.files.length > 0 && this.files[this.files.length - 1].name === '') {
            this.files[this.files.length - 1].name = files[0];
            if (files.length > 1) {
                let newFilesList = files.splice(0, 1);
                newFilesList.forEach((item, i) => {
                    this.addFileItem(item, '', false);
                });
            }
        } else {
            files.forEach((item, i) => {
                this.addFileItem(item, '', false);
            });
        }
    }

    @action
    public removeFileItem = (index: number) => {
        let list = this.files.slice().filter((item, i) => {
            return index !== i;
        });
        this.files = list;
    }

    @action
    public setFileName = (index: number, value: string) => {
        this.files[index].name = value;
    }

    @action
    public setFileDescription = (index: number, value: string) => {
        this.files[index].description = value;
    }

    @action
    public setFileResend = (index: number, value: string) => {
        this.files[index].resend = !this.files[index].resend;
    }

    @action
    public toggleModal = () => {
        this.isModalOpen = !this.isModalOpen;
    }

    @action
    public setCurrentSpot = (spot: any) => {
        this.currentSpot = spot;
    } 

    @action 
    public clearStorage = () => {
        this.files = [];
    }

    @action
    public sendFiles = () => {
        // console.log(this.files);
        // console.log(this.date);
    }
}
