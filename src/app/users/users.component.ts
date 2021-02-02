import { Component, OnInit } from "@angular/core";
import { UserResponseModel } from "app/shared/models/response.model";
import { UserModel } from "app/shared/models/user.model";
import { UserService } from "app/shared/services/user.service";

@Component({
  selector: "app-products",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
  providers: [UserService],
})
export class UsersComponent implements OnInit {
  users: UserModel[] = [];
  constructor(private userService: UserService) {}
  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUsers().subscribe(
      (res: UserResponseModel) => {
        this.users = res.data;
        console.log(this.users);
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }
}
