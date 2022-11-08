package com.example.clover_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignalResponse {
    private String stockCode;
    private Date date;
    private int open;
    private int high;
    private int low;
    private int close;
    private int signal;
    private String reliablity;
}
