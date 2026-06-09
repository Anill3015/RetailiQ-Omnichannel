package com.example.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String name;
    private String username;
    private String password;
    private String email;
    private String phone;

    @Column(name = "status")
    private String status;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    public Long getUserId()                       { return userId; }
    public void setUserId(Long userId)            { this.userId = userId; }

    public String getName()                       { return name; }
    public void setName(String name)              { this.name = name; }

    public String getUsername()                   { return username; }
    public void setUsername(String username)      { this.username = username; }

    public String getPassword()                   { return password; }
    public void setPassword(String password)      { this.password = password; }

    public String getEmail()                      { return email; }
    public void setEmail(String email)            { this.email = email; }

    public String getPhone()                      { return phone; }
    public void setPhone(String phone)            { this.phone = phone; }

    public String getStatus()                     { return status; }
    public void setStatus(String status)          { this.status = status; }

    public Role getRole()                         { return role; }
    public void setRole(Role role)                { this.role = role; }
}