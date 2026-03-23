package kr.co.iei.lecture.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import kr.co.iei.lecture.model.vo.Lecture;
import kr.co.iei.lecture.service.LectureService;
import lombok.RequiredArgsConstructor;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("/api/lectures")
@RequiredArgsConstructor
public class LectureController {

    private final LectureService lectureService;

    @GetMapping
    public ResponseEntity<List<Lecture>> getAll(
            @RequestParam(value = "sort", defaultValue = "created") String sort,
            @RequestParam(value = "category", required = false) Integer category,
            @RequestParam(value = "level", required = false) Integer level,
            @RequestParam(value = "title", required = false) String title) {

        List<Lecture> lectures = lectureService.getAll(sort, category, level, title);
        return ResponseEntity.ok(lectures);
    }

    @GetMapping("/{subjectNo}")
    public ResponseEntity<Lecture> getOne(@PathVariable Long subjectNo) {
        Lecture lecture = lectureService.getOne(subjectNo);
        if (lecture == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(lecture);
    }

    @PostMapping
    public ResponseEntity<Lecture> create(@RequestBody Lecture lecture) {
        return ResponseEntity.ok(lectureService.create(lecture));
    }

    @PutMapping("/{subjectNo}")
    public ResponseEntity<Lecture> update(
            @PathVariable Long subjectNo,
            @RequestBody Lecture lecture) {
        return ResponseEntity.ok(lectureService.update(subjectNo, lecture));
    }

    @DeleteMapping("/{subjectNo}")
    public ResponseEntity<Void> delete(@PathVariable Long subjectNo) {
        lectureService.delete(subjectNo);
        return ResponseEntity.noContent().build();
    }
}