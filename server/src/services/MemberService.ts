import { Service } from "@services/Service";
import { IMember } from "src/interfaces/interfaces";
import { Loan } from "src/models/Loan";
import { Member } from "src/models/Member";

export class MemberService extends Service<IMember>{
    constructor(){
        super(Member);
    }

    override async delete(id: string): Promise<IMember | null> {
        const member = await super.delete(id);
        if(member) await Loan.deleteMany({ member: id });
        return member;
    }
}
