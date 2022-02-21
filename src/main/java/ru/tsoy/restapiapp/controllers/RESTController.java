package ru.tsoy.restapiapp.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import ru.tsoy.restapiapp.models.Role;
import ru.tsoy.restapiapp.models.User;
import ru.tsoy.restapiapp.service.RoleService;
import ru.tsoy.restapiapp.service.UserService;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api")
public class RESTController {

    private final UserService userService;
    private final RoleService roleService;

    public RESTController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/allRoles")
    public ResponseEntity<List<Role>> allRoles() {
        return ResponseEntity.ok(roleService.roleList());
    }

    @GetMapping("/showUser")
    public ResponseEntity<User> showUser() {
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(userService.findUserByUsername(name));
    }

    @GetMapping("/allUsers")
    public ResponseEntity<List<User>> allUsers() {
        return ResponseEntity.ok(userService.userList());
    }

    @PostMapping("/newUser")
    public ResponseEntity<Void> newUser(@RequestBody User user) {
        userService.addUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/updateUser/{id}")
    public ResponseEntity<?> updateUser(@RequestBody User user, @PathVariable long id) {
        try {
            User updatedUser = userService.findUserById(id);
            userService.addUser(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
