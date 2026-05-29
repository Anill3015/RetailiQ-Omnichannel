package com.example.config;

import com.example.filter.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configure(http))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth

                        // ── Public endpoints ──────────────────────────────────────────
                        .requestMatchers("/loginapi/**").permitAll()
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                        .requestMatchers("/role/**").permitAll()
                        .requestMatchers("/appuserapi/**").permitAll()

                        // ── Audit Log — ADMIN only ────────────────────────────────────
                        // Controller: /auditlog
                        .requestMatchers(HttpMethod.GET,    "/auditlog/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST,   "/auditlog/**").denyAll()
                        .requestMatchers(HttpMethod.PUT,    "/auditlog/**").denyAll()
                        .requestMatchers(HttpMethod.DELETE, "/auditlog/**").denyAll()

                        // ── User Management — ADMIN only ──────────────────────────────
                        // Controller: /user
                        .requestMatchers("/user/**").hasRole("ADMIN")

                        // ── Integration Endpoints — ADMIN only ────────────────────────
                        // Controller: /api (IntegrationEndpointController)
                        .requestMatchers("/api/addIntegrationEndpoint").hasRole("ADMIN")
                        .requestMatchers("/api/fetchAllIntegrationEndpoints").hasRole("ADMIN")
                        .requestMatchers("/api/findIntegrationEndpoint/**").hasRole("ADMIN")
                        .requestMatchers("/api/fetchIntegrationEndpointsWithPagination").hasRole("ADMIN")

                        // ── Products ──────────────────────────────────────────────────
                        // Controller: /product
                        .requestMatchers("/product/**").hasAnyRole(
                                "ADMIN", "ECOMMERCE_MANAGER", "STORE_ASSOCIATE"
                        )

                        // ── Inventory ─────────────────────────────────────────────────
                        // Controller: /inventory/availability
                        .requestMatchers("/inventory/availability/**").hasAnyRole(
                                "ADMIN", "INVENTORY_PLANNER", "STORE_ASSOCIATE"
                        )
                        // Controller: /inventory (InventoryPositionController)
                        .requestMatchers("/inventory/**").hasAnyRole(
                                "ADMIN", "INVENTORY_PLANNER"
                        )
                        .requestMatchers("/inventoryavailability/**").hasAnyRole(
                                "ADMIN", "INVENTORY_PLANNER", "STORE_ASSOCIATE"
                        )
                        .requestMatchers("/inventoryposition/**").hasAnyRole(
                                "ADMIN", "INVENTORY_PLANNER"
                        )

                        // ── Replenishment — Controller: /api/replenishment ────────────
                        .requestMatchers("/api/replenishment/**").hasAnyRole(
                                "ADMIN", "INVENTORY_PLANNER"
                        )
                        .requestMatchers("/replenishment/**").hasAnyRole(
                                "ADMIN", "INVENTORY_PLANNER"
                        )

                        // ── Orders — Controller: /orders ──────────────────────────────
                        .requestMatchers("/orders/**").hasAnyRole(
                                "ADMIN", "FULFILLMENT_MANAGER", "STORE_ASSOCIATE",
                                "CUSTOMER_SERVICE_AGENT"
                        )

                        // ── Fulfillment — Controller: /fulfillments ───────────────────
                        .requestMatchers("/fulfillments/**").hasAnyRole(
                                "ADMIN", "FULFILLMENT_MANAGER", "STORE_ASSOCIATE"
                        )
                        .requestMatchers("/fulfillmentinstruction/**").hasAnyRole(
                                "ADMIN", "FULFILLMENT_MANAGER", "STORE_ASSOCIATE"
                        )

                        // ── Returns — Controller: /api ────────────────────────────────
                        .requestMatchers("/api/addReturnAuthorization").hasAnyRole(
                                "ADMIN", "FULFILLMENT_MANAGER", "CUSTOMER_SERVICE_AGENT"
                        )
                        .requestMatchers("/api/updateReturnAuthorization/**").hasAnyRole(
                                "ADMIN", "FULFILLMENT_MANAGER", "CUSTOMER_SERVICE_AGENT"
                        )
                        .requestMatchers("/api/deleteReturnAuthorization/**").hasAnyRole(
                                "ADMIN", "FULFILLMENT_MANAGER", "CUSTOMER_SERVICE_AGENT"
                        )
                        .requestMatchers("/api/findReturnAuthorization/**").hasAnyRole(
                                "ADMIN", "FULFILLMENT_MANAGER", "CUSTOMER_SERVICE_AGENT"
                        )
                        .requestMatchers("/api/fetchAllReturnAuthorizations").hasAnyRole(
                                "ADMIN", "FULFILLMENT_MANAGER", "CUSTOMER_SERVICE_AGENT"
                        )
                        .requestMatchers("/api/fetchAllReturnAuthorizationsPaginated").hasAnyRole(
                                "ADMIN", "FULFILLMENT_MANAGER", "CUSTOMER_SERVICE_AGENT"
                        )
                        .requestMatchers("/returnauthorization/**").hasAnyRole(
                                "ADMIN", "FULFILLMENT_MANAGER", "CUSTOMER_SERVICE_AGENT"
                        )

                        // ── Exception Events — Controller: /api ───────────────────────
                        .requestMatchers("/api/addExceptionEvent").hasAnyRole(
                                "ADMIN", "FULFILLMENT_MANAGER", "CUSTOMER_SERVICE_AGENT"
                        )
                        .requestMatchers("/api/updateExceptionEvent/**").hasAnyRole(
                                "ADMIN", "FULFILLMENT_MANAGER", "CUSTOMER_SERVICE_AGENT"
                        )
                        .requestMatchers("/api/deleteExceptionEvent/**").hasAnyRole(
                                "ADMIN", "FULFILLMENT_MANAGER", "CUSTOMER_SERVICE_AGENT"
                        )
                        .requestMatchers("/api/findExceptionEvent/**").hasAnyRole(
                                "ADMIN", "FULFILLMENT_MANAGER", "CUSTOMER_SERVICE_AGENT"
                        )
                        .requestMatchers("/api/fetchAllExceptionEvents").hasAnyRole(
                                "ADMIN", "FULFILLMENT_MANAGER", "CUSTOMER_SERVICE_AGENT"
                        )
                        .requestMatchers("/api/fetchAllExceptionEventsPaginated").hasAnyRole(
                                "ADMIN", "FULFILLMENT_MANAGER", "CUSTOMER_SERVICE_AGENT"
                        )
                        .requestMatchers("/exceptionevent/**").hasAnyRole(
                                "ADMIN", "FULFILLMENT_MANAGER", "CUSTOMER_SERVICE_AGENT"
                        )

                        // ── Customer Profiles — Controller: /api/customer ─────────────
                        .requestMatchers("/api/customer/**").hasAnyRole(
                                "ADMIN", "STORE_ASSOCIATE", "CUSTOMER_SERVICE_AGENT"
                        )
                        .requestMatchers("/customerprofile/**").hasAnyRole(
                                "ADMIN", "STORE_ASSOCIATE", "CUSTOMER_SERVICE_AGENT"
                        )

                        // ── Promotions — Controller: /promotion ───────────────────────
                        .requestMatchers("/promotion/**").hasAnyRole(
                                "ADMIN", "ECOMMERCE_MANAGER", "MARKETING_MANAGER"
                        )

                        // ── PromotionType — Controller: /promotionType ────────────────
                        .requestMatchers("/promotionType/**").hasAnyRole(
                                "ADMIN", "ECOMMERCE_MANAGER", "MARKETING_MANAGER"
                        )
                        .requestMatchers("/promotiontype/**").hasAnyRole(
                                "ADMIN", "ECOMMERCE_MANAGER", "MARKETING_MANAGER"
                        )

                        // ── PriceList — Controller: /pricelist ────────────────────────
                        .requestMatchers("/pricelist/**").hasAnyRole(
                                "ADMIN", "ECOMMERCE_MANAGER", "MARKETING_MANAGER"
                        )

                        // ── Forecast — Controller: /api/forecast ──────────────────────
                        .requestMatchers("/api/forecast/**").hasAnyRole(
                                "ADMIN", "ECOMMERCE_MANAGER", "INVENTORY_PLANNER",
                                "MARKETING_MANAGER"
                        )
                        .requestMatchers("/forecast/**").hasAnyRole(
                                "ADMIN", "ECOMMERCE_MANAGER", "INVENTORY_PLANNER",
                                "MARKETING_MANAGER"
                        )

                        // ── KPI Reports — Controller: /api ────────────────────────────
                        .requestMatchers("/api/addKPIReport").hasAnyRole(
                                "ADMIN", "ECOMMERCE_MANAGER", "INVENTORY_PLANNER",
                                "MARKETING_MANAGER"
                        )
                        .requestMatchers("/api/updateKPIReport/**").hasAnyRole(
                                "ADMIN", "ECOMMERCE_MANAGER", "INVENTORY_PLANNER",
                                "MARKETING_MANAGER"
                        )
                        .requestMatchers("/api/deleteKPIReport/**").hasAnyRole(
                                "ADMIN", "ECOMMERCE_MANAGER", "INVENTORY_PLANNER",
                                "MARKETING_MANAGER"
                        )
                        .requestMatchers("/api/findKPIReport/**").hasAnyRole(
                                "ADMIN", "ECOMMERCE_MANAGER", "INVENTORY_PLANNER",
                                "MARKETING_MANAGER"
                        )
                        .requestMatchers("/api/fetchAllKPIReports").hasAnyRole(
                                "ADMIN", "ECOMMERCE_MANAGER", "INVENTORY_PLANNER",
                                "MARKETING_MANAGER"
                        )
                        .requestMatchers("/api/fetchAllKPIReportsPaginated").hasAnyRole(
                                "ADMIN", "ECOMMERCE_MANAGER", "INVENTORY_PLANNER",
                                "MARKETING_MANAGER"
                        )
                        .requestMatchers("/kpireport/**").hasAnyRole(
                                "ADMIN", "ECOMMERCE_MANAGER", "INVENTORY_PLANNER",
                                "MARKETING_MANAGER"
                        )

                        // ── Recommendation — Controller: /api/recommendation ───────────
                        .requestMatchers("/api/recommendation/**").hasAnyRole(
                                "ADMIN", "ECOMMERCE_MANAGER", "MARKETING_MANAGER"
                        )
                        .requestMatchers("/recommendation/**").hasAnyRole(
                                "ADMIN", "ECOMMERCE_MANAGER", "MARKETING_MANAGER"
                        )

                        // ── Locations — Controller: /api/location ─────────────────────
                        .requestMatchers("/api/location/**").hasAnyRole(
                                "ADMIN", "INVENTORY_PLANNER", "FULFILLMENT_MANAGER"
                        )
                        .requestMatchers("/location/**").hasAnyRole(
                                "ADMIN", "INVENTORY_PLANNER", "FULFILLMENT_MANAGER"
                        )

                        // ── Notifications — Controller: /api ──────────────────────────
                        .requestMatchers("/api/addNotification").hasAnyRole(
                                "ADMIN", "STORE_ASSOCIATE", "ECOMMERCE_MANAGER",
                                "INVENTORY_PLANNER", "FULFILLMENT_MANAGER",
                                "CUSTOMER_SERVICE_AGENT", "MARKETING_MANAGER"
                        )
                        .requestMatchers("/api/updateNotification").hasAnyRole(
                                "ADMIN", "STORE_ASSOCIATE", "ECOMMERCE_MANAGER",
                                "INVENTORY_PLANNER", "FULFILLMENT_MANAGER",
                                "CUSTOMER_SERVICE_AGENT", "MARKETING_MANAGER"
                        )
                        .requestMatchers("/api/findNotification/**").hasAnyRole(
                                "ADMIN", "STORE_ASSOCIATE", "ECOMMERCE_MANAGER",
                                "INVENTORY_PLANNER", "FULFILLMENT_MANAGER",
                                "CUSTOMER_SERVICE_AGENT", "MARKETING_MANAGER"
                        )
                        .requestMatchers("/api/fetchAllNotifications").hasAnyRole(
                                "ADMIN", "STORE_ASSOCIATE", "ECOMMERCE_MANAGER",
                                "INVENTORY_PLANNER", "FULFILLMENT_MANAGER",
                                "CUSTOMER_SERVICE_AGENT", "MARKETING_MANAGER"
                        )
                        .requestMatchers("/api/fetchNotificationsWithPagination").hasAnyRole(
                                "ADMIN", "STORE_ASSOCIATE", "ECOMMERCE_MANAGER",
                                "INVENTORY_PLANNER", "FULFILLMENT_MANAGER",
                                "CUSTOMER_SERVICE_AGENT", "MARKETING_MANAGER"
                        )
                        .requestMatchers("/api/deleteNotification").hasAnyRole(
                                "ADMIN", "STORE_ASSOCIATE", "ECOMMERCE_MANAGER",
                                "INVENTORY_PLANNER", "FULFILLMENT_MANAGER",
                                "CUSTOMER_SERVICE_AGENT", "MARKETING_MANAGER"
                        )
                        .requestMatchers("/api/alerts/**").hasAnyRole(
                                "ADMIN", "STORE_ASSOCIATE", "ECOMMERCE_MANAGER",
                                "INVENTORY_PLANNER", "FULFILLMENT_MANAGER",
                                "CUSTOMER_SERVICE_AGENT", "MARKETING_MANAGER"
                        )
                        .requestMatchers("/notification/**").hasAnyRole(
                                "ADMIN", "STORE_ASSOCIATE", "ECOMMERCE_MANAGER",
                                "INVENTORY_PLANNER", "FULFILLMENT_MANAGER",
                                "CUSTOMER_SERVICE_AGENT", "MARKETING_MANAGER"
                        )

                        // ── Any other request must be authenticated ───────────────────
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}