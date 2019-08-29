package org.team.apps.board;

import javax.persistence.*;

@Entity
public class Cell {

	public Cell() {
	}

	public Cell(final String type, final Integer coordinateX, final Integer coordinateY) {
		this.type = type;
		this.coordinateX = coordinateX;
		this.coordinateY = coordinateY;
	}

	@Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    private Boolean touched;

    private String type;

    @Column(name = "cord_x")
    private Integer coordinateX;

    @Column(name = "cord_y")
    private Integer coordinateY;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }



    public Boolean getTouched() {
        return touched;
    }

    public void setTouched(Boolean touched) {
        this.touched = touched;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getCoordinateX() {
        return coordinateX;
    }

    public void setCoordinateX(Integer coordinateX) {
        this.coordinateX = coordinateX;
    }

    public Integer getCoordinateY() {
        return coordinateY;
    }

    public void setCoordinateY(Integer coordinateY) {
        this.coordinateY = coordinateY;
    }
}
