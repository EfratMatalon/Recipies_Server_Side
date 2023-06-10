export class response {
    constructor(
        public resID?: number,
        public recipyID?: number,
        public userID?: number,
        public firstName?: string,
        public lastName?: string,
        //public email?: string,
        public resDate?: Date,
        public content?: string,
        public toRes?: number,
        public isApproved?:boolean
        ) { }


}