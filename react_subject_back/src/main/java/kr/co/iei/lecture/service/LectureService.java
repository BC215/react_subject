package kr.co.iei.lecture.service;

import java.util.List;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import kr.co.iei.lecture.dao.LectureDao;
import kr.co.iei.lecture.model.vo.Lecture;

@Service
@RequiredArgsConstructor
public class LectureService {
    private final LectureDao lectureDao;

    // 정렬/카테고리/레벨/제목 검색 파라미터를 모두 받는 메서드
    public List<Lecture> getAll(String sort, Integer category, Integer level, String title) {
        return lectureDao.selectAll(sort, category, level, title);
    }

    public Lecture getOne(Long subjectNo) {
        return lectureDao.selectById(subjectNo);
    }

    public Lecture create(Lecture lecture) {
        lectureDao.insert(lecture);
        return lecture;
    }

    public Lecture update(Long subjectNo, Lecture lecture) {
        lecture.setSubjectNo(subjectNo);
        lectureDao.update(lecture);
        return lectureDao.selectById(subjectNo);
    }

    public void delete(Long subjectNo) {
        lectureDao.delete(subjectNo);
    }
}