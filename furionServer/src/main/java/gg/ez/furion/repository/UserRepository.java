package gg.ez.furion.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import gg.ez.furion.model.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository <User, String>{

    @Query("{'email' : ?0}")
    Optional<User> findByEmail (String email);
}
