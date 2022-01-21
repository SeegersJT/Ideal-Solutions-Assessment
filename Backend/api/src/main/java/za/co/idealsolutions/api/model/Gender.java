package za.co.idealsolutions.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "genders")
public class Gender {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "gender")
	private String gender;

	public Gender() {

	}

	public Gender(String gender) {
		this.gender = gender;
	}

	public long getId() {
		return id;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	@Override
	public String toString() {
		return "Gender [id=" + id + ", gender=" + gender + "]";
	}
}
