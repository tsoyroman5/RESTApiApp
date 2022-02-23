package ru.tsoy.restapiapp.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class LoginController {

    @GetMapping("/admin")
    public String adminPage() {
        return "index";
    }

    @GetMapping("/user")
    public String userPage() {
        return "user";
    }


}
