package ru.tsoy.restapiapp.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import ru.tsoy.restapiapp.models.Role;
import ru.tsoy.restapiapp.models.User;
import ru.tsoy.restapiapp.service.RoleService;
import ru.tsoy.restapiapp.service.UserService;

import java.util.List;

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

    @GetMapping("/findUserById/{id}")
    public ResponseEntity<User> findUserById(@PathVariable long id) {
        return ResponseEntity.ok(userService.findUserById(id));
    }

    @GetMapping("/allUsers")
    public ResponseEntity<List<User>> allUsers() {
        return ResponseEntity.ok(userService.userList());
    }

    @PostMapping("/newUser")
    public ResponseEntity<List<User>> newUser(@RequestBody User user) {
        userService.addUser(user);
        return ResponseEntity.ok(userService.userList());
    }

    @PutMapping("/updateUser/{id}")
    public ResponseEntity<List<User>> updateUser(@RequestBody User user, @PathVariable long id) {
        User updatedUser = userService.findUserById(id);
        updatedUser.setName(user.getName());
        updatedUser.setSurname(user.getSurname());
        updatedUser.setAge(user.getAge());
        updatedUser.setUsername(user.getUsername());
        updatedUser.setPassword(user.getPassword());
        updatedUser.setRoles(user.getRoles());
        userService.addUser(updatedUser);
        return ResponseEntity.ok(userService.userList());
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<List<User>> deleteUser(@PathVariable long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(userService.userList());
    }


}
