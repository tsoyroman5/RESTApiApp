package ru.tsoy.restapiapp.service;

import ru.tsoy.restapiapp.models.Role;

import java.util.List;
import java.util.Set;

public interface RoleService {
    List<Role> roleList();
    Set<Role> findRolesByNames(List<String> roles);
}
