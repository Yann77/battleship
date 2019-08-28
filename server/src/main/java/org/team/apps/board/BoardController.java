package org.team.apps.board;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class BoardController {

    private BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

//    @MessageMapping("/board/create")
//    @SendTo("/topic/board/created")
//    public GameOutputMessage create(e) {
//        return new GameOutputMessage(games);
//    }

    @MessageMapping("/board/get/{userId}")
    @SendTo("/topic/board/get")
    public Board getByUserId(@DestinationVariable("userId") Integer userId) {
        System.out.println(String.format("userId:%s", userId));
        Board board = boardService.findByUserId(userId);
        return board;
    }

}
