package gg.ez.furion.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document ("user")
public class User {
	@Id
	private String id;
	@Indexed (unique = true)
	private String email;
	private Integer steam32ID;

	public User(String id, Integer steam32ID, String email) {
		this.id = id;
		this.steam32ID = steam32ID;
		this.email = email;
	}

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Integer getSteam32ID() {
		return steam32ID;
	}
	public void setSteam32ID(Integer steam32ID) {
		this.steam32ID = steam32ID;
	}
}
