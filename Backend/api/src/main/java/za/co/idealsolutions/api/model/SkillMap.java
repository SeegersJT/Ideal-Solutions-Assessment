package za.co.idealsolutions.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "skill_map")
public class SkillMap {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "context")
	private String context;

	@Column(name = "context_id")
	private long contextId;

	@Column(name = "skill_id")
	private long skillId;

	@Column(name = "rating_id")
	private long ratingId;

	public SkillMap() {

	}

	public SkillMap(String context, long contextId, long skillId, long ratingId) {
		this.context = context;
        this.contextId = contextId;
        this.skillId = skillId;
        this.ratingId = ratingId;
	}

	public long getId() {
		return id;
	}

	public String getContext() {
		return context;
	}
	public void setContext(String context) {
		this.context = context;
	}

    public long getContextId() {
		return contextId;
	}
	public void setContextId(long contextId) {
		this.contextId = contextId;
	}

    public long getSkillId() {
		return skillId;
	}
	public void setSkillId(long skillId) {
		this.skillId = skillId;
	}

    public long getRatingId() {
		return ratingId;
	}
	public void setRatingId(long ratingId) {
		this.ratingId = ratingId;
	}

	@Override
	public String toString() {
		return "Tutorial [" 
        + "id=" + id 
        + ", context=" + context
        + ", context_id=" + contextId
        + ", skill_id=" + skillId
        + ", rating_id=" + ratingId
        + "]";
	}
}
