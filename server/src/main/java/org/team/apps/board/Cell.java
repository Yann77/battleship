package org.team.apps.board;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


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
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;

	@Column(insertable = false)
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

	/**
	 * Compare the current coordinate of the Cell with those in parameters.
	 *
	 * @param coordinateX
	 * @param coordinateY
	 * @return true if equals else false
	 */
	public Boolean compareCoordinate(Integer coordinateX, Integer coordinateY) {
		if (coordinateX != null && coordinateY != null) {
			return (coordinateX.equals(this.coordinateX) && coordinateY.equals(this.coordinateY));
		}
		return null;
	}

	@Override
	public String toString() {
		return "Cell{\n" +
				"type='" + type + '\'' +
				",\n coordinateX=" + coordinateX +
				",\n coordinateY=" + coordinateY +
				"}\n";
	}
}
