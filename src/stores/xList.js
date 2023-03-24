import { defineStore } from 'pinia'
import { Screen, Dialog } from 'quasar'
import { api } from 'src/boot/axios'
import notify from 'src/composables/notify'

export const useXListStore = defineStore('xList', {
  state: () => ({
    columns: [],
    rows: [],
    selectedRows: [],
    filter: '',
    tableLoadingMode: false,
    pagination: {
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10,
      sortBy: 'id',
      descending: false
    },
    rowsPerPageOptions: [5, 10, 15, 20, 25, 50, 100],

    /* SEPARADOR */
    title: '',
    routeGroupName: '',
    permissionsGroupName: '',
    apiGroupName: '',
    filterPlaceholder: '',

    /* SEPARADOR */
    fullScreenMode: false,
    showFullscreenModeTooltip: true,
    gridMode: Screen.lt.md,
    actionsButtonStatus: false
  }),
  getters: {
    selectedRowsId () {
      return this.selectedRows.map(item => item.id)
    },
    selectedRowId () {
      if (this.selectedRows.length) {
        return this.selectedRowsId[0]
      }
      return null
    },

    /* SEPARADOR */
    fullscreenModeIcon () {
      return this.fullScreenMode ? 'fullscreen_exit' : 'fullscreen'
    },
    fullscreenModeTooltipLabel () {
      if (!this.showFullscreenModeTooltip) return null
      return this.fullScreenMode ? 'Sair do modo tela cheia' : 'Colocar em modo tela cheia'
    },
    gridModeTooltipLabel () {
      return this.gridMode ? 'Sair do modo grade' : 'Colocar em modo grade'
    }
  },
  actions: {
    reset () {
      this.rows = []
      this.selectedRows = []
      this.filter = ''
      this.pagination = {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10,
        sortBy: 'id',
        descending: false
      }
    },
    async getItems (scope) {
      try {
        const { page, rowsPerPage, sortBy, descending } = scope.pagination
        this.tableLoadingMode = true
        const { data } = await api(
          {
            url: `/api/${this.apiGroupName}`,
            params: {
              page,
              rowsPerPage,
              sortBy,
              descending,
              search: this.filter
            }
          }
        )
        this.rows = data.data.data
        this.pagination.page = data.data.current_page
        this.pagination.rowsPerPage = data.data.per_page
        this.pagination.rowsNumber = data.data.total
        this.pagination.sortBy = sortBy
        this.pagination.descending = descending
        this.tableLoadingMode = false
      } catch (error) {
        notify.error(error)
      }
    },
    rowClick (event, row) {
      const exists = this.selectedRows.find(item => item.id === row.id)
      if (exists) {
        this.selectedRows = this.selectedRows.filter(item => item.id !== row.id)
      } else {
        this.selectedRows.push(row)
      }

      this.actionsButtonStatus = !!this.selectedRows.length
    },

    /* SEPARADOR */
    view () {
      this.router.push({ name: `${this.routeGroupName}-view`, params: { id: this.selectedRowId } })
    },
    edit () {
      this.router.push({ name: `${this.routeGroupName}-edit`, params: { id: this.selectedRowId } })
    },
    destroy () {
      Dialog.create({
        title: 'Atenção !',
        message: 'Tem certeza que deseja excluir todos os itens selecionados?',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        try {
          const { data } = await api({ method: 'delete', url: `/api/${this.apiGroupName}`, data: { items: this.selectedRowsId } })
          this.rows = this.rows.filter(val => !this.selectedRowsId.includes(val.id))
          notify.success(data.message)
        } catch (error) {
          notify.error(error)
        }
      })
    },

    /* SEPARADOR */
    toggleFullscreenMode () {
      this.fullScreenMode = !this.fullScreenMode
      this.showFullscreenModeTooltip = false
      setTimeout(() => { this.showFullscreenModeTooltip = true })
    },
    toggleGridMode () {
      this.gridMode = !this.gridMode
    }
  }
})
