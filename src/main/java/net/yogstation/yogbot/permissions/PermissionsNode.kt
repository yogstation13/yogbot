package net.yogstation.yogbot.permissions

class PermissionsNode (
	val role: String
) {
	private val permissions: MutableSet<String> = HashSet()
	private val parents: MutableSet<PermissionsNode> = HashSet()


	/**
	 * Checks if this permission node has the specified permission
	 *
	 * @param perm The permission
	 * @return If this node has it
	 */
	fun hasPermission(perm: String): Boolean {
		return permissions.contains(perm)
	}

	/**
	 * Calculates the permissions of this node using the parents
	 * Sets finalized to avoid recalculating
	 */
	fun calculatePermissions() {
		for (parent in parents) {
			parent.calculatePermissions()
			permissions.addAll(parent.permissions)
		}
	}

	class PermissionsNodeBuilder {
		private var name = ""
		private var perms = mutableListOf<String>()
		private var parents = mutableListOf<String>()

		fun setName(name: String): PermissionsNodeBuilder {
			this.name = name
			return this
		}

		fun setPerms(vararg perms: String): PermissionsNodeBuilder {
			this.perms.addAll(perms)
			return this
		}

		fun setParents(vararg parents: String): PermissionsNodeBuilder {
			this.parents.addAll(parents)
			return this
		}

		fun build(manager: PermissionsManager): PermissionsNode {
			val node = PermissionsNode(name)
			node.permissions.addAll(perms)
			for (parentName in parents) {
				val parentNode = manager.getNodeFor(parentName) ?: throw java.lang.IllegalStateException("Cannot initialize a permissions node before its parents")
				node.parents.add(parentNode)
			}
			return node
		}
	}

	companion object {
		fun builder(): PermissionsNodeBuilder {
			return PermissionsNodeBuilder()
		}
	}
}
