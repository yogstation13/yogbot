package net.yogstation.yogbot.permissions

import discord4j.core.`object`.entity.Member
import discord4j.core.`object`.entity.Role
import org.springframework.stereotype.Component
import java.util.function.Consumer

@Component
class PermissionsManager {
	private val nodes: MutableMap<String, PermissionsNode> = HashMap()

	init {
		addNode(PermissionsNode.builder().setName("Wiki Staff").setPerms("wikiban").build(this))
		addNode(PermissionsNode.builder().setName("Lore Team").setPerms("loreban").build(this))
		addNode(PermissionsNode.builder().setName("subscriber").setPerms("unsubscribe").build(this))
		addNode(PermissionsNode.builder().setName("YogPost").setPerms("post").build(this))
		addNode(PermissionsNode.builder().setName("mentor").setPerms("mhelp", "listmentors").build(this))
		addNode(
			PermissionsNode.builder()
				.setName("Head Mentor")
				.setPerms("addmentor", "removementor", "mentorban")
				.setParents("mentor")
				.build(this)
		)
		addNode(
			PermissionsNode.builder()
				.setName("maintainer")
				.setPerms("reboot", "toggleooc")
				.setParents("mentor")
				.build(this)
		)
		addNode(
			PermissionsNode.builder()
				.setName("retmin")
				.setPerms(
					"tempban", "ban", "unban", "kick", "ticket", "whitelist", "note", "staffban",
					"listadmins"
				)
				.setParents("maintainer")
				.build(this)
		)
		addNode(PermissionsNode.builder().setName("staff").setParents("retmin").build(this))
		addNode(
			PermissionsNode.builder()
				.setName("senior admin")
				.setPerms("addao", "removeao")
				.setParents("staff", "Head Mentor")
				.build(this)
		)
		addNode(PermissionsNode.builder().setName("head-developer").setParents("senior admin").build(this))
		addNode(
			PermissionsNode.builder()
				.setName("council")
				.setPerms("userverify")
				.setParents("head-developer")
				.build(this)
		)
		addNode(PermissionsNode.builder().setName("host").setParents("council").build(this))
		nodes.keys.forEach(Consumer { key: String -> nodes[key]!!.calculatePermissions() })
	}

	fun getNodeFor(name: String): PermissionsNode? {
		return nodes.getOrDefault(name, null)
	}

	private fun addNode(node: PermissionsNode) {
		nodes[node.role] = node
	}

	/**
	 * Checks if the application command is being run by someone authorized to run the command
	 *
	 * @param member The member
	 * @return If the member has permission
	 */
	fun hasPermission(member: Member?, requiredPermission: String?): Boolean {
		if(requiredPermission == null) return true
		if(member == null) return false
		return member.roles.any { role: Role ->
			val node = getNodeFor(role.name) ?: return@any false
			node.hasPermission(requiredPermission)
		}.block() ?: false
	}
}
