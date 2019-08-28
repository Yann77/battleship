package org.team.apps.board;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.team.apps.user.User;

public interface BoardRepository  extends JpaRepository<Board, Integer> {

    Optional<Board> findByUser(User user);

}
