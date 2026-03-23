package kr.co.iei.lecture.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import kr.co.iei.lecture.model.vo.Lecture;

@Mapper
public interface LectureDao {
    List<Lecture> selectAll(
        @Param("sort") String sort,
        @Param("category") Integer category,
        @Param("level") Integer level,
        @Param("title") String title);

    Lecture selectById(@Param("subjectNo") Long subjectNo);
    int insert(Lecture lecture);
    int update(Lecture lecture);
    int delete(@Param("subjectNo") Long subjectNo);
}