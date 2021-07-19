package gg.ez.furion.controller;

import gg.ez.furion.model.User;
import gg.ez.furion.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private final UserService userService;

    public UserController (UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<String> addUser (@RequestBody User user) {
        try {
            User existingUser = this.userService.getUserByEmail(user.getEmail());
            this.userService.updateUser(existingUser);
            return ResponseEntity.status(HttpStatus.OK).build ();
        } catch (NoSuchElementException err) {
            // TODO wrap in try catch
            this.userService.addUser(user);
        } catch (Exception err) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).build ();
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<String> deleteUserByEmail (@PathVariable String email) {
        try {
            User existingUser = this.userService.getUserByEmail(email);
            this.userService.deleteUser(existingUser.getId());
        } catch (NoSuchElementException err) {
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception err) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.OK).build ();
    }

    @PutMapping
    public ResponseEntity<String> updateUser (@RequestBody User user) {
        // TODO wrap in try catch
        this.userService.updateUser(user);
        return ResponseEntity.status(HttpStatus.OK).build ();
    }

    @GetMapping("/{email}")
    public ResponseEntity<User> getUserByEmail (@PathVariable String email) {
        // TODO wrap in try catch
        return ResponseEntity.ok(this.userService.getUserByEmail(email));
    }

    @GetMapping("/auth/{email}")
    public ResponseEntity<Boolean> isExistingUser (@PathVariable String email) {
        boolean userExists = false;
        try {
            User existingUser = this.userService.getUserByEmail(email);
            userExists = true;
        } catch (NoSuchElementException ignored) {}
        return ResponseEntity.ok(userExists);
    }
}
