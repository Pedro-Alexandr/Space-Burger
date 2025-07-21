package com.spaceburger.space_burger.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.spaceburger.space_burger.repository.CategoriaRepository;
import com.spaceburger.space_burger.repository.PedidoRepository;
import com.spaceburger.space_burger.repository.ProdutoRepository;
import com.spaceburger.space_burger.repository.PromocaoRepository;
import com.spaceburger.space_burger.repository.UsuarioRepository;

@Controller
public class ApplicationController {
    private final CategoriaRepository categoriaRepository;
    private final ProdutoRepository produtoRepository;
    private final PedidoRepository pedidoRepository;
    private final PromocaoRepository promocaoRepository;
    private final UsuarioRepository usuarioRepository;

    public ApplicationController(CategoriaRepository categoriaRepository, ProdutoRepository produtoRepository,
            PedidoRepository pedidoRepository, PromocaoRepository promocaoRepository,
            UsuarioRepository usuarioRepository) {
        this.categoriaRepository = categoriaRepository;
        this.produtoRepository = produtoRepository;
        this.pedidoRepository = pedidoRepository;
        this.promocaoRepository = promocaoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping("/categorias")
    public String showCategorias(Model model) {
        model.addAttribute("categorias", categoriaRepository.findAll());
        return "index";
    }

    @GetMapping("/produtos")
    public String showProdutos(Model model) {
        model.addAttribute("produtos", produtoRepository.findAll());
        return "index";
    }

    @GetMapping("/pedidos")
    public String showPedidos(Model model) {
        model.addAttribute("pedidos", pedidoRepository.findAll());
        return "index";
    }

    @GetMapping("#promocoes")
    public String showPromocoes(Model model) {
        model.addAttribute("promocoes", promocaoRepository.findAll());
        return "index";
    }

    @GetMapping("/")
    public String showUsuario(Model model) {
        model.addAttribute("usuario", usuarioRepository.findAll());
        return "index";
    }

}
