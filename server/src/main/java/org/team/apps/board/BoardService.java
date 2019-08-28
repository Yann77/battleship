package org.team.apps.board;

import java.util.Optional;
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
           }
        }
        return null;
    }


}
