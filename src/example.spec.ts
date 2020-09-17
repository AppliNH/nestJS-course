// describe("My test", () => {

//     it("returns true", () => { // This gives a name to our test
//         expect(true).toEqual(true)
//     });

// });

// Feature
class FriendsList {
    friends = [];

    addFriend(name: string) {
        this.friends.push(name);
        this.announceFriendship(name);
    }

    announceFriendship(name: string) {
        global.console.log(`${name} is now a friend !`)
    }

    removeFriend(name: string) {
        const idx = this.friends.indexOf(name);

        if(idx === -1) {
            throw new Error(`Friend named ${name} not found`);
        }

        this.friends.splice(idx, 1);
    }
}

// Tests

describe("FriendsList", () => {

    let friendsList;

    beforeEach(() => {  // Will run before each test
        friendsList = new FriendsList();
    });

    it("Initializes friends list", () => {

        expect(friendsList.friends.length).toEqual(0);
    })

    it("adds a friend to the list", () => {

        friendsList.addFriend("Elon");
        expect(friendsList.friends.length).toEqual(1);

    });

    it("announces friendship", () => {

        friendsList.announceFriendship = jest.fn(); // Mock function

        expect(friendsList.announceFriendship).not.toHaveBeenCalled();
        friendsList.addFriend("Elon");
        expect(friendsList.announceFriendship).toHaveBeenCalledWith("Elon");

    });

    describe("removeFriend", () => {

        it("removes a friend from the list", () => {
            friendsList.addFriend("Bob");
            expect(friendsList.friends[0]).toEqual("Bob");
            friendsList.removeFriend("Bob");
            expect(friendsList.friends[0]).toBeUndefined();
        });

        it("error when friends does not exist", () => {
            expect(() => friendsList.removeFriend("Zizou")).toThrow(new Error("Friend named Zizou not found"));  // Test exception throw
        });




    });

})