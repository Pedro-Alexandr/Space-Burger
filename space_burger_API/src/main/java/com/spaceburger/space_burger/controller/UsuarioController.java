package com.spaceburger.space_burger.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spaceburger.space_burger.repository.UsuarioRepository;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    private final UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping("/")
    public ResponseEntity<?> getAll() {
        return new ResponseEntity<>(usuarioRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/nome/{nome}")
    public ResponseEntity<?> getByNome(@PathVariable String nome) {
        return new ResponseEntity<>(usuarioRepository.findByNomeLike("%" + nome + "%"), HttpStatus.OK);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<?> getByEmail(@PathVariable String email) {
        return new ResponseEntity<>(usuarioRepository.findByEmailLike("%" + email + "%"), HttpStatus.OK);
    }

    @GetMapping("/telefone/{telefone}")
    public ResponseEntity<?> getByTelefone(@PathVariable Integer telefone) {
        return new ResponseEntity<>(usuarioRepository.findByTelefone(telefone), HttpStatus.OK);
    }

    @GetMapping("/telefone/greater/{telefone}")
    public ResponseEntity<?> getByTelefoneGreaterThan(@PathVariable Integer telefone) {
        return new ResponseEntity<>(usuarioRepository.findByTelefoneGreaterThan(telefone), HttpStatus.OK);
    }

    @GetMapping("/telefone/less/{telefone}")
    public ResponseEntity<?> getByTelefoneLessThan(@PathVariable Integer telefone) {
        return new ResponseEntity<>(usuarioRepository.findByTelefoneLessThan(telefone), HttpStatus.OK);
    }
}
