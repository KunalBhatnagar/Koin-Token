import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Hash "mo:base/Hash";
// 

actor Token{

    var owner: Principal = Principal.fromText("jrriz-ulkpb-dbprv-xw2yz-tvm5w-6vqve-4c2dh-f3sfh-iquts-7cweb-2qe");
    var totalSupply: Nat = 1000000000;
    var symbol : Text = "Koin";

    private stable var balanceEntries : [(Principal,Nat)] = [];
    private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
    

    public query func balanceOf(who: Principal) : async Nat {
        let balance : Nat = switch(balances.get(who)){
            case null 0;
            case (?result) result;
        };
        return balance;
    };

    public query func getSymbol(): async Text{
        return symbol;
    };

    public shared(msg) func payOut() : async Text{

        if (balances.get(msg.caller)== null){
        let amount = 10000;
        let result = await transfer(msg.caller,amount);
        return result;
        } else {
            return "Already claimed";
        }
    };

    public shared(msg) func transfer(to: Principal,amount : Nat) : async Text{
        let fromBalance = await balanceOf(msg.caller);
        if(fromBalance > amount){
            let newfromBalance: Nat = fromBalance - amount;
            balances.put(msg.caller,newfromBalance);

            let toBalance = await balanceOf(to);
            let newToBalance: Nat = toBalance + amount;
            balances.put(to, newToBalance);
            return "success";

        }else{
            return "Insufficient fund";
        }

    };

    system func preupgrade(){
        balanceEntries :=  Iter.toArray(balances.entries());

    };

    system func postupgrade(){
        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
        if(balances.size() < 1){
        balances.put(owner,totalSupply);
        }
    }

};