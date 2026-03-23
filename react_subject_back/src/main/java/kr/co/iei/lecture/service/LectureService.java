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

    public List<Lecture> getAll() {
        return lectureDao.selectAll();
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