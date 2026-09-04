package com.example.flowtalk.model;

import java.util.List;

public class UserStatus {

    private List<String> users;

    public UserStatus() {
    }

    public UserStatus(List<String> users) {
        this.users = users;
    }

    public List<String> getUsers() {
        return users;
    }

    public void setUsers(List<String> users) {
        this.users = users;
    }
}