import { Injectable } from '@angular/core';
import { Icecream } from './icecream.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class IcecreamService {
    icecreams : Icecream[];
    icecreamListChangedEvent = new Subject<Icecream[]>();
    maxIcecreamId: number;

    constructor(private http: HttpClient) { }

    addIcecream(newIcecream: Icecream) {
        if (!newIcecream) {
            return;
        }
        this.maxIcecreamId++;
        newIcecream.id = this.maxIcecreamId.toString();
        this.icecreams.push(newIcecream);
        this.storeIcecreams();
    }

    deleteIcecream(icecream: Icecream) {
        if (!icecream) {
            return;
        }
        const pos = this.icecreams.indexOf(icecream);
        if (pos < 0) {
            return;
        }
        this.icecreams.splice(pos, 1);
        this.storeIcecreams();
    }

    getIcecream(id: string): Icecream {
        for (const icecream of this.icecreams) {
            if (icecream.id === id) {
                return icecream;
            }
        }

        return null;
    }

    getIcecreams() {
        this.http.get('https://final-project-61ccf.firebaseio.com/icecreams.json')
        .subscribe(
            (icecreams: Icecream[]) => {
                this.icecreams = icecreams;
                this.maxIcecreamId = this.getMaxId();
                this.icecreams.sort((a, b) => (a.name < b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
                this.icecreamListChangedEvent.next(this.icecreams.slice());
            },
            (error: any) => {
                console.log(error);
            }
        );
    }

    getMaxId(): number {
        let maxId = 0;
        for (const icecream of this.icecreams) {
            let currentId = parseInt(icecream.id);
            if (currentId > maxId) {
                maxId = currentId;
            }
        }

        return maxId;
    }

    storeIcecreams() {
        let icecreams =JSON.stringify(this.icecreams);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        this.http.put('https://final-project-61ccf.firebaseio.com/icecreams.json', icecreams, { headers: headers })
        .subscribe(
            () => {
                this.icecreamListChangedEvent.next(this.icecreams.slice());
            }
        );
    }

    updateIcecream(originalIcecream: Icecream, newIcecream: Icecream) {
        if (!originalIcecream || !newIcecream) {
            return;
        }
        const pos = this.icecreams.indexOf(originalIcecream);

        if (pos < 0) {
            return;
        }
        newIcecream.id = originalIcecream.id;
        this.icecreams[pos] = newIcecream;
        const icecreamsListListClone = this.icecreams.slice();
        this.icecreamListChangedEvent.next(icecreamsListListClone);
    }
}