package com.shinhan.hack.remittance.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.shinhan.hack.login.entity.Student;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Getter
@Setter
@Builder
@ToString
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class DutchPay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dutch_id")
    private Long dutchId;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    Student student;

    @Column(name = "amount", nullable = false)
    private Long amount;

    @Column(name = "dutch_state", nullable = false)
    private Boolean dutchState;

    static String patternTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    static LocalDateTime time = LocalDateTime.parse(patternTime, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

    @Column(name = "request_time", nullable = false)
    @CreatedDate
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Builder.Default
    private LocalDateTime requestTime = time;

}
