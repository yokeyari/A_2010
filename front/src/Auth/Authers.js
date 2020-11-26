const PERM = {
  ALL: 4,
  PUBLIC: 3,
  OWN: 2,
  NO: 0,
}

class BaseAuther {
  constructor(user, target = null) {
    if (user.token && user.id == "") {
      user.level = "guest"
    } else if (user.workspace_id == "home") {
      user.level = "owner"
    } else {
      user.level = user.permission
    }
    this.user = user
    this.target = target
    this.setDefault(user);
    console.log(user)
  }

  setDefault = (user) => {
    switch (user.level) {
      case "owner":
        this.default = {
          read: PERM.ALL, create: PERM.ALL, edit: PERM.OWN, delete: PERM.ALL
        }
        break;
      case "sup":
        this.default = {
          read: PERM.ALL, create: PERM.ALL, edit: PERM.OWN, delete: PERM.OWN
        }
        break;
      case "general":
        this.default = {
          read: PERM.ALL, create: PERM.ALL, edit: PERM.OWN, delete: PERM.OWN
        }
        break;
      case "guest":
        this.default = {
          read: PERM.ALL, create: PERM.NO, edit: PERM.NO, delete: PERM.NO
        }
        break;
      default:
        this.default = {
          read: PERM.NO, create: PERM.NO, edit: PERM.NO, delete: PERM.NO
        }
    }
  }


  calcAuth = (target, action) => {
    if (target == null) target = this.target;

    if (this.user.id == target.user_id) {
      return this.default[action] >= PERM.OWN
    } else {
      return this.default[action] >= PERM.ALL
    }
  }

  canRead = (target) => {
    return this.calcAuth(target, 'read')
  }
  canCreate = (target) => {
    return this.calcAuth(target, 'create')
  }
  canEdit = (target) => {
    return this.calcAuth(target, 'edit')
  }
  canDelete = (target) => {
    return this.calcAuth(target, 'delete')
  }

  makeAuth = (target) => {
    return {
      canRead: this.canRead(target),
      canCreate: this.canCreate(target),
      canDelete: this.canDelete(target),
      canEdit: this.canEdit(target),
    }
  }

}

class MemoAuther extends BaseAuther {
  constructor(user) {
    super(user);
    if (true) {
      this.default = { ...this.default, read: PERM.ALL }
    }
  }
  canCreate = (page) => {
    return this.calcAuth(page, 'create')
  }

  canRead = (target) => {
    if (this.user.level == "guest") {
      return true
    }
    if (target.status == "pri") {
      // console.log("is pri",target.user_id.toString(),this.user,target.user_id.toString() == this.user.id)
      return (target.user_id.toString() == this.user.id)
    } else if (target.status == "pub") {
      return true
    }
  }
}

class PageAuther extends BaseAuther {
  constructor(user) {
    super(user);
    if (user.level == "general") {
      this.default = { ...this.default, create: PERM.NO }
    }
  }
  canRead = (target) => {
    if (this.user.workspace_id == "home") {
      return (target.workspace_id == null);
    } else {
      if (target.workspace_id == this.user.workspace_id) {
        return this.calcAuth(target, 'read');
      } else {
        return false
      }
    }
  }

  canCreate = () => {
    return this.default['create'] >= PERM.ALL
  }
}

class WSAuther extends BaseAuther {
  constructor(user) {
    super(user);
  }
}



export { MemoAuther, PageAuther, WSAuther };