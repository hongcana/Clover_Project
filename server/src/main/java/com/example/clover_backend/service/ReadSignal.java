package com.example.clover_backend.service;

import com.example.clover_backend.dto.SignalResponse;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.util.Date;

@Service
public class ReadSignal {
    public SignalResponse readSignal()
            throws IOException, ParseException {

        JSONParser parser = new JSONParser();

        // JSON 파일 읽기
        Reader reader = new FileReader("/home/ubuntu/python/signal.json");
        JSONObject jsonObject = (JSONObject) parser.parse(reader);

        String stockCode = (String) jsonObject.get("stock_code");
        Date date = (Date) jsonObject.get("date");
        int open = (int) jsonObject.get("open");
        int high = (int) jsonObject.get("high");
        int low = (int) jsonObject.get("low");
        int close = (int) jsonObject.get("close");
        int signal = (int) jsonObject.get("signal");
        String reliablity = (String) jsonObject.get("신뢰도");

        return SignalResponse.builder()
                .signal(signal)
                .date(date)
                .open(open)
                .high(high)
                .low(low)
                .close(close)
                .signal(signal)
                .reliablity(reliablity)
                .build();
    }
}
