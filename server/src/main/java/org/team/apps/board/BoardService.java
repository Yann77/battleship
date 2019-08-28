package org.team.apps.board;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.team.apps.user.User;
import org.team.apps.user.UserRepository;

public class BoardService {

    private BoardRepository boardRepository;
    private UserRepository userRepository;

    public BoardService(BoardRepository boardRepository, UserRepository userRepository) {
        this.boardRepository = boardRepository;
        this.userRepository = userRepository;
    }

    public Board findByUserId(Integer id) {
        Optional<User> user = this.userRepository.findById(id);
        if(user.isPresent()) {
           Optional<Board> board =  this.boardRepository.findByUser(user.get());
           if(board.isPresent()) {
               return board.get();
           } else {
               Board board1 = createBoard(user.get());
               return this.boardRepository.save(board1);
           }

        }
        return null;
    }

    private Board createBoard(User user) {
        List<Cell> cells = createCells();

        Board board = new Board();
        board.setCellList(cells);
        board.setUser(user);
        return board;
    }


    private List<Cell> createCells() {
        return IntStream.range(1, 10)
                .mapToObj( i -> {
                    Cell cell = new Cell();
                    if (i % 2 == 0) {
                        cell.setCoordinateX(i);
                    } else {
                        cell.setCoordinateY(i);
                    }
                    return cell;
                }).collect(Collectors.toList());
    }

}
