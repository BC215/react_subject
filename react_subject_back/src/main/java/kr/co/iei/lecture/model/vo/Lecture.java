package kr.co.iei.lecture.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Alias(value="Lecture")
public class Lecture {
    private Long subjectNo;
    private String subjectTitle;
    private String subjectInstructor;
    private Integer subjectCategory;
    private Integer subjectLevel;
    private Integer subjectCount;
}