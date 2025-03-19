package com.spaceburger.space_burger.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.spaceburger.space_burger.repository.PedidoRepository;

@RestController
public class PedidoController {

    private final PedidoRepository pedidoRepository;

    public PedidoController(PedidoRepository pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    @GetMapping("/pedido")
    public ResponseEntity<?> getAll() {
        return new ResponseEntity<>(pedidoRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("pedido/pedido/{pedido}")
    public ResponseEntity<?> getByPedido(@PathVariable String pedido) {
        return new ResponseEntity<>(pedidoRepository.findByPedidoLike("%" + pedido + "%"), HttpStatus.OK);
    }

    @GetMapping("pedido/data/{data}")
    public ResponseEntity<?> getByData(@PathVariable String data) {
        try {
            // Converter a string recebida para LocalDate
            LocalDate dataFormatada = LocalDate.parse(data);

            // Definir o intervalo de busca (o dia inteiro)
            LocalDateTime inicioDoDia = dataFormatada.atStartOfDay();
            LocalDateTime fimDoDia = dataFormatada.atTime(23, 59, 59);

            // Buscar pedidos no intervalo do dia
            return new ResponseEntity<>(pedidoRepository.findByIntervaloDeDatas(inicioDoDia, fimDoDia), HttpStatus.OK);
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("Formato de data inválido. Use o formato: yyyy-MM-dd");
        }
    }

    @GetMapping("pedido/tipoPagamento/{tipoPagamento}")
    public ResponseEntity<?> getByTipoPagamento(@PathVariable String tipoPagamento) {
        return new ResponseEntity<>(pedidoRepository.findByTipoPagamentoLike("%" + tipoPagamento + "%"), HttpStatus.OK);
    }

    @GetMapping("pedido/usuario/{usuario}")
    public ResponseEntity<?> getByUsuarioNome(@PathVariable String usuarioNome) {
        return new ResponseEntity<>(pedidoRepository.findByUsuario_NomeContaining(usuarioNome), HttpStatus.OK);
    }

    @GetMapping("pedido/usuario/id/{usuario}")
    public ResponseEntity<?> getByUsuarioId(@PathVariable int usuario_IdStart, @PathVariable int usuario_IdEnd) {
        return new ResponseEntity<>(pedidoRepository.findByUsuario_IdBetween(usuario_IdStart, usuario_IdEnd), HttpStatus.OK);
    }

    @GetMapping("pedido/status/{status}")
    public ResponseEntity<?> getByStatus(@PathVariable String status) {
        return new ResponseEntity<>(pedidoRepository.findByStatusLike("%" + status + "%"), HttpStatus.OK);
    }
}