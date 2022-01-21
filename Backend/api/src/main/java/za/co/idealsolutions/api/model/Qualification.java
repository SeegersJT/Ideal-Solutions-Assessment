package za.co.idealsolutions.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "qualifications")
public class Qualification {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "qualification")
	private String qualification;

	public Qualification() {

	}

	public Qualification(String qualification) {
		this.qualification = qualification;
	}

	public long getId() {
		return id;
	}

	public String getQualification() {
		return qualification;
	}

	public void setQualification(String qualification) {
		this.qualification = qualification;
	}

	@Override
	public String toString() {
		return "Qualification [id=" + id + ", qualification=" + qualification + "]";
	}
}
