package za.co.idealsolutions.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "skills")
public class Skill {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "skill")
	private String skill;

	public Skill() {

	}

	public Skill(String skill) {
		this.skill = skill;
	}

	public long getId() {
		return id;
	}

	public String getSkill() {
		return skill;
	}

	public void setSkill(String skill) {
		this.skill = skill;
	}

	@Override
	public String toString() {
		return "Skill [id=" + id + ", skill=" + skill + "]";
	}
}
