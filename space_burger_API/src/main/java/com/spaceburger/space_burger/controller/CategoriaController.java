package com.spaceburger.space_burger.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spaceburger.space_burger.entity.Categoria;
import com.spaceburger.space_burger.entity.Promocao;
import com.spaceburger.space_burger.repository.CategoriaRepository;
import com.spaceburger.space_burger.repository.PromocaoRepository;

@RestController
@RequestMapping("/api")
public class CategoriaController {

    private final CategoriaRepository categoriaRepository;
    private final PromocaoRepository promocaoRepository;

    public CategoriaController(CategoriaRepository categoriaRepository, PromocaoRepository promocaoRepository) {
        this.categoriaRepository = categoriaRepository;
        this.promocaoRepository = promocaoRepository;
    }

    @GetMapping("/categoria")
    public ResponseEntity<?> getAll() {
        List<Categoria> categorias = categoriaRepository.findAll();

        // Java: 1 = Monday, 7 = Sunday | Banco: 1 = Domingo, 7 = Sabado
        int diaSemanaId = LocalDate.now().getDayOfWeek().getValue();
        diaSemanaId = diaSemanaId == 7 ? 1 : diaSemanaId + 1;

        // Busca as promoções do dia com base no ID do dia da semana
        List<Promocao> promocoesDoDia = promocaoRepository.findByDiaSemana_Id(diaSemanaId);

        List<Object> resultadoFinal = new ArrayList<>();

        for (Categoria categoria : categorias) {
            if ("BARATOS DO DIA!".equalsIgnoreCase(categoria.getNome())) {
                if (!promocoesDoDia.isEmpty()) {
                    Map<String, Object> categoriaPromocao = new HashMap<>();
                    categoriaPromocao.put("id", categoria.getId());
                    categoriaPromocao.put("nome", categoria.getNome());
                    categoriaPromocao.put("promocoes", promocoesDoDia);
                    resultadoFinal.add(categoriaPromocao);
                }
            } else {
                resultadoFinal.add(categoria);
            }
        }

        return new ResponseEntity<>(resultadoFinal, HttpStatus.OK);
    }

    @GetMapping("/categoria/nome/{nome}")
    public ResponseEntity<?> getByNome(@PathVariable String nome) {
        return new ResponseEntity<>(categoriaRepository.findByNomeLike("%" + nome + "%"), HttpStatus.OK);
    }
}
