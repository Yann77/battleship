package org.team.apps.board;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import org.team.apps.user.User;


@Entity
public class Board {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @OneToMany
    @JoinColumn(name="board_id", nullable=false)
//    @JoinColumn(name="board_id", referencedColumnName="id")
    private List<Cell> cellList;

    @OneToOne
    private User user;

//    @OneToMany
//    private List<View> viewList;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<Cell> getCellList() {
        return cellList;
    }

    public void setCellList(List<Cell> cellList) {
        this.cellList = cellList;
    }

//    public List<View> getViewList() {
//        return viewList;
//    }
//
//    public void setViewList(List<View> viewList) {
//        this.viewList = viewList;
//    }
}
