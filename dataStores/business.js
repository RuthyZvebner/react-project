import { action, computed, makeAutoObservable, observable, runInAction } from "mobx";
import axios from "axios";

class Bussiness {

    data = {
        id: '1',
        name: "Advice and insights",
        address: "ramchal",
        phone: "0556721978",
        owner: "RUTHY ZVEBNER",
        // logo: "הכנס לוגו",
        description: "Advice from rich life experience",
    }
    constructor() {
        makeAutoObservable(this, {
            data: observable,
            getBusiness: computed,
            updateBusiness: action
        });
        this.fetchData();
    }
    fetchData() {
        axios.get('http://localhost:8787/businessData').then((res) => {
            runInAction(() => {
                this.data = res.data;
                console.log(this.data);
            });
        }).catch(() => {
        })
    }
    
    fetchDataExist = async () => {
        const bus = this.data;
        await this.fetchData();
        if (this.data = {})
        {
            await this.updateBusiness(bus);
            this.data=bus;
        }   
    }

    updateBusiness(business) {
        fetch('http://localhost:8787/businessData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(business)

        }).then(response => response.json()).then(data => {
            console.log(data);
            this.data = data;
        }).catch(err => {
            console.log(err);
        });
    }

    get getBusiness() {
        return this.data;
    }

}

export default new Bussiness();

