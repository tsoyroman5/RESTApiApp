package ru.tsoy.restapiapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.tsoy.restapiapp.models.Role;


public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findRoleByName(String name);
}
