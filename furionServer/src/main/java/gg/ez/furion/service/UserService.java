package gg.ez.furion.service;

import gg.ez.furion.model.User;
import gg.ez.furion.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepo;

    public UserService (UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public void addUser (User user) {
        this.userRepo.insert(user);
    }

    public void deleteUser (String id) {
        this.userRepo.deleteById(id);
    }

    public void updateUser (User user) {
        User existingUser = this.userRepo.findById(user.getId())
                .orElseThrow( () -> new NoSuchElementException(
                        String.format("Could not find User id %s", user.getId())
                ));
        existingUser.setEmail(user.getEmail());
        existingUser.setSteam32ID(user.getSteam32ID());
        this.userRepo.save (existingUser);
    }

    public User getUser (String id) {
        return this.userRepo.findById(id)
                .orElseThrow( () -> new NoSuchElementException(
                        String.format("Could not find User id %s", id)
                ));
    }

    public User getUserByEmail (String email) {
        return this.userRepo.findByEmail(email)
                .orElseThrow( () -> new NoSuchElementException(
                        String.format("Could not find User email %s", email)
                ));
    }
}
