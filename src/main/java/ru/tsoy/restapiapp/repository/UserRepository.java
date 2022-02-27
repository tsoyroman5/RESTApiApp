package ru.tsoy.restapiapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.tsoy.restapiapp.models.User;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "SELECT DISTINCT user FROM User user ORDER BY user.id")
    List<User> findAll();

    User findUserByUsername(String username);
    User findUserById(long id);
}
