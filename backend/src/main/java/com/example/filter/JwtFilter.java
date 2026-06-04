package com.example.filter;

import com.example.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;
<<<<<<< HEAD

=======
>>>>>>> Rakesh
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

<<<<<<< HEAD
        String path = request.getRequestURI();

        // ✅ ✅ VERY IMPORTANT: Skip public APIs
        if (path.startsWith("/appuserapi") ||
            path.startsWith("/loginapi") ||
            path.startsWith("/swagger-ui") ||
            path.startsWith("/swagger-ui.html") ||
            path.startsWith("/v3/api-docs")) {

            filterChain.doFilter(request, response);
            return;
        }

        System.out.println("JwtFilter running for: " + path);
=======
        // ✅ Add this debug line
        System.out.println("JwtFilter running for: " + request.getRequestURI());
        
>>>>>>> Rakesh

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

<<<<<<< HEAD
            try {
                if (jwtUtil.validateToken(token)) {

                    String username = jwtUtil.extractUsername(token);
                    String role = jwtUtil.extractRole(token);
                    String springRole = "ROLE_" + role.toUpperCase();

                    UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(
                                    username,
                                    null,
                                    List.of(new SimpleGrantedAuthority(springRole))
                            );

                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            } catch (Exception e) {
                // ✅ DO NOT block request — just continue
                System.out.println("JWT error: " + e.getMessage());
            }
        }

        // ✅ ✅ Always continue filter chain
        filterChain.doFilter(request, response);
    }
=======
            if (jwtUtil.validateToken(token)) {
                String username = jwtUtil.extractUsername(token);
                String role = jwtUtil.extractRole(token);
                String springRole = "ROLE_" + role.toUpperCase();

                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                username, null,
                                List.of(new SimpleGrantedAuthority(springRole))
                        );

                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }

        filterChain.doFilter(request, response);
    }



>>>>>>> Rakesh
}