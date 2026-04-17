(function () {
    const state = {
        token: localStorage.getItem('idialog-tools-token') || '',
        apiBase: localStorage.getItem('idialog-tools-api') || '/api',
        plans: [],
        swotAnalyses: [],
        businessPlans: [],
        feasibilityStudies: [],
        projects: [],
        projectTasks: [],
        activeProjectId: null,
        widgets: [],
        company: null,
    };

    const el = {
        authView: document.getElementById('auth-view'),
        dashboardView: document.getElementById('dashboard-view'),
        loginForm: document.getElementById('login-form'),
        registerForm: document.getElementById('register-form'),
        companyForm: document.getElementById('company-form'),
        logoForm: document.getElementById('logo-form'),
        planForm: document.getElementById('plan-form'),
        planReset: document.getElementById('plan-reset'),
        plansList: document.getElementById('plans-list'),
        swotForm: document.getElementById('swot-form'),
        swotReset: document.getElementById('swot-reset'),
        swotList: document.getElementById('swot-list'),
        businessPlanForm: document.getElementById('business-plan-form'),
        businessPlanReset: document.getElementById('business-plan-reset'),
        businessPlansList: document.getElementById('business-plans-list'),
        feasibilityForm: document.getElementById('feasibility-form'),
        feasibilityReset: document.getElementById('feasibility-reset'),
        feasibilityList: document.getElementById('feasibility-list'),
        projectForm: document.getElementById('project-form'),
        projectReset: document.getElementById('project-reset'),
        projectsList: document.getElementById('projects-list'),
        pmAddMilestone: document.getElementById('pm-add-milestone'),
        pmMilestonesWrap: document.getElementById('pm-milestones-wrap'),
        pmTaskPanel: document.getElementById('pm-task-panel'),
        pmTaskProjectTitle: document.getElementById('pm-task-project-title'),
        pmCloseTasks: document.getElementById('pm-close-tasks'),
        pmTaskKpiRow: document.getElementById('pm-task-kpi-row'),
        taskForm: document.getElementById('task-form'),
        taskReset: document.getElementById('task-reset'),
        taskMilestoneSelect: document.getElementById('task-milestone-select'),
        pmTaskList: document.getElementById('pm-task-list'),
        pmKpiTotal: document.getElementById('pm-kpi-total'),
        pmKpiActive: document.getElementById('pm-kpi-active'),
        pmKpiDone: document.getElementById('pm-kpi-done'),
        pmKpiOverdue: document.getElementById('pm-kpi-overdue'),
        pmAlerts: document.getElementById('pm-alerts'),
        pmTimelineContainer: document.getElementById('pm-timeline-container'),
        pmTimeline: document.getElementById('pm-timeline'),
        widgetForm: document.getElementById('widget-form'),
        widgetReset: document.getElementById('widget-reset'),
        widgetsList: document.getElementById('widgets-list'),
        widgetType: document.getElementById('widget-type'),
        widgetMediaFile: document.getElementById('widget-media-file'),
        widgetMediaFields: document.getElementById('widget-media-fields'),
        widgetCodeFields: document.getElementById('widget-code-fields'),
        widgetPreview: document.getElementById('widget-preview'),
        logoutBtn: document.getElementById('logout-btn'),
        toast: document.getElementById('toast'),

        logoPreview: document.getElementById('logo-preview'),
        registerLogoFile: document.getElementById('register-logo-file'),

        apiConfigToggle: document.getElementById('api-config-toggle'),
        apiConfigPanel: document.getElementById('api-config-panel'),
        apiUrlInput: document.getElementById('api-url-input'),
        apiSaveBtn: document.getElementById('api-save-btn'),
        apiStatus: document.getElementById('api-status'),
    };

    function showToast(message, isError) {
        if (!el.toast) {
            return;
        }
        el.toast.textContent = message;
        el.toast.style.borderColor = isError ? 'rgba(255, 80, 80, 0.45)' : 'rgba(0, 229, 255, 0.35)';
        el.toast.classList.add('show');
        window.clearTimeout(showToast._timer);
        showToast._timer = window.setTimeout(() => el.toast.classList.remove('show'), 2800);
    }

    function parseArrayField(value) {
        return (value || '')
            .split(';')
            .map(item => item.trim())
            .filter(Boolean);
    }

    function fmtDate(value) {
        if (!value) {
            return '-';
        }
        return new Date(value + 'T00:00:00').toLocaleDateString('pt-BR');
    }

    function getApiBase() {
        return (state.apiBase || '').replace(/\/$/, '');
    }

    async function request(path, options) {
        const headers = Object.assign({}, options && options.headers ? options.headers : {});
        if (state.token) {
            headers.Authorization = `Bearer ${state.token}`;
        }

        let response;
        try {
            response = await fetch(`${getApiBase()}${path}`, Object.assign({}, options || {}, { headers }));
        } catch (error) {
            throw new Error('Nao foi possivel conectar na API. Verifique a URL da API e se o backend esta online.');
        }
        const contentType = response.headers.get('content-type') || '';

        if (!response.ok) {
            let errorMessage = `Erro ${response.status}`;
            if (contentType.includes('application/json')) {
                const data = await response.json();
                errorMessage = data.error || errorMessage;
            }
            throw new Error(errorMessage);
        }

        if (contentType.includes('application/json')) {
            return response.json();
        }

        return response;
    }

    function setLoggedIn(loggedIn) {
        if (el.authView) {
            el.authView.hidden = loggedIn;
        }
        if (el.dashboardView) {
            el.dashboardView.hidden = !loggedIn;
        }
    }

    function fillCompanyForm(company) {
        if (!company || !el.companyForm) {
            return;
        }

        ['name', 'cnpj', 'email', 'phone', 'address', 'header_text', 'footer_text'].forEach(field => {
            const input = el.companyForm.elements[field];
            if (input) {
                input.value = company[field] || '';
            }
        });

        if (company.logo_url && el.logoPreview) {
            el.logoPreview.src = company.logo_url;
            el.logoPreview.hidden = false;
        } else if (el.logoPreview) {
            el.logoPreview.hidden = true;
        }
    }

    function renderPlans() {
        if (!el.plansList) {
            return;
        }

        if (!state.plans.length) {
            el.plansList.innerHTML = '<p>Nenhum planejamento cadastrado ate o momento.</p>';
            return;
        }

        el.plansList.innerHTML = state.plans.map(plan => `
            <div class="plan-item" data-plan-id="${plan.id}">
                <div class="plan-item-header">
                    <div>
                        <div class="plan-item-title">${escapeHtml(plan.title)}</div>
                        <div class="plan-item-period">${fmtDate(plan.period_start)} ate ${fmtDate(plan.period_end)}</div>
                    </div>
                    <div class="plan-item-actions">
                        <button type="button" class="mini-btn" data-action="edit">Editar</button>
                        <button type="button" class="mini-btn" data-action="delete">Excluir</button>
                        <button type="button" class="mini-btn" data-action="docx">DOCX</button>
                        <button type="button" class="mini-btn" data-action="pdf">PDF</button>
                        <button type="button" class="mini-btn" data-action="excel">Excel</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function renderSwotAnalyses() {
        if (!el.swotList) {
            return;
        }

        if (!state.swotAnalyses.length) {
            el.swotList.innerHTML = '<p>Nenhuma analise SWOT cadastrada ate o momento.</p>';
            return;
        }

        el.swotList.innerHTML = state.swotAnalyses.map(swot => `
            <div class="plan-item" data-swot-id="${swot.id}">
                <div class="plan-item-header">
                    <div>
                        <div class="plan-item-title">${escapeHtml(swot.title)}</div>
                        <div class="plan-item-period">
                            ${fmtDate(swot.analysis_date)} | ${escapeHtml(swot.business_unit || 'Unidade geral')} | ${fmtDate(swot.period_start)} ate ${fmtDate(swot.period_end)}
                        </div>
                    </div>
                    <div class="plan-item-actions">
                        <button type="button" class="mini-btn" data-action="edit">Editar</button>
                        <button type="button" class="mini-btn" data-action="delete">Excluir</button>
                        <button type="button" class="mini-btn" data-action="docx">DOCX</button>
                        <button type="button" class="mini-btn" data-action="pdf">PDF</button>
                        <button type="button" class="mini-btn" data-action="excel">Excel</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function renderBusinessPlans() {
        if (!el.businessPlansList) {
            return;
        }

        if (!state.businessPlans.length) {
            el.businessPlansList.innerHTML = '<p>Nenhum plano de negocios cadastrado ate o momento.</p>';
            return;
        }

        el.businessPlansList.innerHTML = state.businessPlans.map(plan => `
            <div class="plan-item" data-business-plan-id="${plan.id}">
                <div class="plan-item-header">
                    <div>
                        <div class="plan-item-title">${escapeHtml(plan.title)}</div>
                        <div class="plan-item-period">${escapeHtml(plan.industry || 'Segmento geral')} | ${fmtDate(plan.period_start)} ate ${fmtDate(plan.period_end)}</div>
                    </div>
                    <div class="plan-item-actions">
                        <button type="button" class="mini-btn" data-action="edit">Editar</button>
                        <button type="button" class="mini-btn" data-action="delete">Excluir</button>
                        <button type="button" class="mini-btn" data-action="docx">DOCX</button>
                        <button type="button" class="mini-btn" data-action="pdf">PDF</button>
                        <button type="button" class="mini-btn" data-action="excel">Excel</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function renderFeasibilityStudies() {
        if (!el.feasibilityList) {
            return;
        }

        if (!state.feasibilityStudies.length) {
            el.feasibilityList.innerHTML = '<p>Nenhum estudo de viabilidade cadastrado ate o momento.</p>';
            return;
        }

        el.feasibilityList.innerHTML = state.feasibilityStudies.map(study => `
            <div class="plan-item" data-feasibility-id="${study.id}">
                <div class="plan-item-header">
                    <div>
                        <div class="plan-item-title">${escapeHtml(study.title)}</div>
                        <div class="plan-item-period">${escapeHtml(study.project_type || 'Projeto')} | ${escapeHtml(study.sector || 'Setor geral')} | ${fmtDate(study.analysis_date)}</div>
                    </div>
                    <div class="plan-item-actions">
                        <button type="button" class="mini-btn" data-action="edit">Editar</button>
                        <button type="button" class="mini-btn" data-action="delete">Excluir</button>
                        <button type="button" class="mini-btn" data-action="docx">DOCX</button>
                        <button type="button" class="mini-btn" data-action="pdf">PDF</button>
                        <button type="button" class="mini-btn" data-action="excel">Excel</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function placementLabel(value) {
        const labels = {
            top_banner: 'Banner superior',
            prefooter_banner: 'Banner antes do rodape',
            content_square: 'Quadrados antes do rodape',
            sidebar_square: 'Lateral direita',
        };
        return labels[value] || value;
    }

    function scopeLabel(value) {
        const labels = {
            all: 'Site inteiro',
            site: 'Site institucional',
            blog: 'Blog',
            revista: 'Revista',
        };
        return labels[value] || value;
    }

    function syncWidgetFieldVisibility() {
        if (!el.widgetType || !el.widgetMediaFields || !el.widgetCodeFields) {
            return;
        }

        const isCode = el.widgetType.value === 'code';
        el.widgetMediaFields.hidden = isCode;
        el.widgetCodeFields.hidden = !isCode;
    }

    function setWidgetPreview(mediaUrl, altText) {
        if (!el.widgetPreview) {
            return;
        }

        if (!mediaUrl) {
            el.widgetPreview.hidden = true;
            el.widgetPreview.removeAttribute('src');
            return;
        }

        el.widgetPreview.src = mediaUrl;
        el.widgetPreview.alt = altText || 'Preview do widget';
        el.widgetPreview.hidden = false;
    }

    function renderWidgets() {
        if (!el.widgetsList) {
            return;
        }

        if (!state.widgets.length) {
            el.widgetsList.innerHTML = '<p>Nenhum widget cadastrado ate o momento.</p>';
            return;
        }

        el.widgetsList.innerHTML = state.widgets.map(widget => {
            const title = escapeHtml(widget.title || widget.name);
            const preview = widget.widget_type === 'image' && widget.media_url
                ? `<img src="${widget.media_url}" alt="${escapeHtml(widget.alt_text || widget.name)}">`
                : '<div class="widget-item-preview-code">Codigo incorporado pronto para receber Google Ads ou HTML confiavel.</div>';

            return `
                <div class="widget-item" data-widget-id="${widget.id}">
                    <div class="widget-item-header">
                        <div>
                            <div class="widget-item-title">${title}</div>
                            <div class="widget-item-meta">
                                <span class="widget-chip">${placementLabel(widget.placement)}</span>
                                <span class="widget-chip">${scopeLabel(widget.scope)}</span>
                                <span class="widget-chip">${widget.widget_type === 'code' ? 'Codigo' : 'Imagem/GIF'}</span>
                                <span class="widget-chip ${widget.is_active ? 'is-live' : 'is-paused'}">${widget.is_active ? 'Ativo' : 'Pausado'}</span>
                            </div>
                        </div>
                        <div class="plan-item-actions">
                            <button type="button" class="mini-btn" data-action="edit">Editar</button>
                            <button type="button" class="mini-btn" data-action="toggle">${widget.is_active ? 'Pausar' : 'Ativar'}</button>
                            <button type="button" class="mini-btn" data-action="delete">Excluir</button>
                        </div>
                    </div>
                    <div class="widget-item-body">
                        <div class="widget-item-copy">
                            <p><strong>Ordem:</strong> ${widget.display_order}</p>
                            <p><strong>Titulo exibido:</strong> ${escapeHtml(widget.title || 'Publicidade')}</p>
                            <p><strong>Destino:</strong> ${escapeHtml(widget.target_url || 'Sem link externo')}</p>
                        </div>
                        <div class="widget-item-preview">${preview}</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function fillPlanForm(plan) {
        if (!el.planForm) {
            return;
        }

        const fields = [
            'plan_id',
            'title',
            'period_start',
            'period_end',
            'mission',
            'vision',
            'values',
            'swot_strengths',
            'swot_weaknesses',
            'swot_opportunities',
            'swot_threats',
            'objectives',
            'initiatives',
            'indicators',
        ];

        fields.forEach(field => {
            const input = el.planForm.elements[field];
            if (!input) {
                return;
            }

            const raw = plan[field];
            if (Array.isArray(raw)) {
                input.value = raw.join('; ');
                return;
            }
            input.value = raw || '';
        });
    }

    function clearPlanForm() {
        if (!el.planForm) {
            return;
        }
        el.planForm.reset();
        el.planForm.elements.plan_id.value = '';
    }

    function fillSwotForm(swot) {
        if (!el.swotForm) {
            return;
        }

        const fields = [
            'swot_id',
            'title',
            'analysis_date',
            'business_unit',
            'period_start',
            'period_end',
            'analysis_objective',
            'strengths',
            'weaknesses',
            'opportunities',
            'threats',
            'so_strategies',
            'wo_strategies',
            'st_strategies',
            'wt_strategies',
            'priority_actions',
            'critical_risks',
            'executive_summary',
        ];

        fields.forEach(field => {
            const input = el.swotForm.elements[field];
            if (!input) {
                return;
            }

            const raw = swot[field];
            if (Array.isArray(raw)) {
                input.value = raw.join('; ');
                return;
            }

            input.value = raw || '';
        });
    }

    function clearSwotForm() {
        if (!el.swotForm) {
            return;
        }
        el.swotForm.reset();
        el.swotForm.elements.swot_id.value = '';
    }

    function fillBusinessPlanForm(plan) {
        if (!el.businessPlanForm) {
            return;
        }

        const fields = [
            'business_plan_id',
            'title',
            'industry',
            'target_market',
            'period_start',
            'period_end',
            'executive_summary',
            'problem_statement',
            'value_proposition',
            'products_services',
            'market_analysis',
            'marketing_strategy',
            'operational_plan',
            'revenue_streams',
            'cost_structure',
            'investment_requirements',
            'financial_projections',
            'team_structure',
            'milestones',
            'risks_mitigation',
        ];

        fields.forEach(field => {
            const input = el.businessPlanForm.elements[field];
            if (!input) {
                return;
            }

            const raw = plan[field];
            if (Array.isArray(raw)) {
                input.value = raw.join('; ');
                return;
            }

            input.value = raw || '';
        });
    }

    function clearBusinessPlanForm() {
        if (!el.businessPlanForm) {
            return;
        }
        el.businessPlanForm.reset();
        el.businessPlanForm.elements.business_plan_id.value = '';
    }

    function fillFeasibilityForm(study) {
        if (!el.feasibilityForm) {
            return;
        }

        const fields = [
            'feasibility_id',
            'title',
            'project_type',
            'sector',
            'sponsor',
            'location',
            'analysis_date',
            'horizon_years',
            'capex_estimate',
            'opex_estimate',
            'technical_scope',
            'technical_requirements',
            'engineering_solution',
            'technology_readiness',
            'implementation_schedule',
            'resource_plan',
            'regulatory_licensing',
            'environmental_social',
            'demand_assumptions',
            'pricing_model',
            'revenue_assumptions',
            'cost_assumptions',
            'financing_structure',
            'wacc_assumption',
            'cash_flow_projection',
            'economic_indicators',
            'sensitivity_analysis',
            'scenario_analysis',
            'key_risks',
            'risk_response_plan',
            'final_recommendation',
        ];

        fields.forEach(field => {
            const input = el.feasibilityForm.elements[field];
            if (!input) {
                return;
            }

            const raw = study[field];
            if (Array.isArray(raw)) {
                input.value = raw.join('; ');
                return;
            }

            input.value = raw || '';
        });
    }

    function clearFeasibilityForm() {
        if (!el.feasibilityForm) {
            return;
        }
        el.feasibilityForm.reset();
        el.feasibilityForm.elements.feasibility_id.value = '';
    }

    /* =============================================
       PROJECT MANAGEMENT
    ============================================= */

    function statusLabel(val) {
        const labels = {
            planning: 'Planejamento', active: 'Ativo', on_hold: 'Em espera',
            completed: 'Concluido', cancelled: 'Cancelado',
            todo: 'A Fazer', in_progress: 'Em Andamento', review: 'Em Revisao',
            done: 'Concluida', blocked: 'Bloqueada',
        };
        return labels[val] || val || '-';
    }

    function priorityLabel(val) {
        const labels = { low: 'Baixa', medium: 'Media', high: 'Alta', critical: 'Critica' };
        return labels[val] || val || '-';
    }

    function isOverdue(task) {
        if (!task.due_date || task.status === 'done') return false;
        return task.due_date < new Date().toISOString().slice(0, 10);
    }

    function computeProjectProgress(project) {
        const tasks = state.projectTasks.filter(t => String(t.project_id) === String(project.id));
        if (!tasks.length) return 0;
        const sum = tasks.reduce((acc, t) => acc + (t.progress || 0), 0);
        return Math.round(sum / tasks.length);
    }

    function addMilestoneRow(name, dueDate, status) {
        if (!el.pmMilestonesWrap) return;
        const row = document.createElement('div');
        row.className = 'pm-milestone-row';
        row.innerHTML = `
            <input type="text" placeholder="Nome da etapa" value="${escapeHtml(name || '')}">
            <input type="date" value="${dueDate || ''}">
            <select>
                <option value="pending"${status === 'pending' || !status ? ' selected' : ''}>Pendente</option>
                <option value="in_progress"${status === 'in_progress' ? ' selected' : ''}>Em andamento</option>
                <option value="completed"${status === 'completed' ? ' selected' : ''}>Concluida</option>
            </select>
            <button type="button" class="pm-remove-milestone" title="Remover etapa"><i class="fas fa-trash-alt"></i></button>
        `;
        row.querySelector('.pm-remove-milestone').addEventListener('click', () => row.remove());
        el.pmMilestonesWrap.appendChild(row);
    }

    function getMilestonesFromForm() {
        if (!el.pmMilestonesWrap) return [];
        const rows = el.pmMilestonesWrap.querySelectorAll('.pm-milestone-row');
        const milestones = [];
        rows.forEach(row => {
            const inputs = row.querySelectorAll('input');
            const select = row.querySelector('select');
            const name = (inputs[0] ? inputs[0].value : '').trim();
            if (name) {
                milestones.push({
                    name: name,
                    due_date: inputs[1] ? inputs[1].value : '',
                    status: select ? select.value : 'pending',
                });
            }
        });
        return milestones;
    }

    function clearMilestoneRows() {
        if (el.pmMilestonesWrap) el.pmMilestonesWrap.innerHTML = '';
    }

    function fillProjectForm(project) {
        if (!el.projectForm) return;
        el.projectForm.elements.project_id.value = project.id || '';
        el.projectForm.elements.title.value = project.title || '';
        el.projectForm.elements.description.value = project.description || '';
        el.projectForm.elements.manager_name.value = project.manager_name || '';
        el.projectForm.elements.manager_email.value = project.manager_email || '';
        el.projectForm.elements.start_date.value = project.start_date || '';
        el.projectForm.elements.end_date.value = project.end_date || '';
        el.projectForm.elements.status.value = project.status || 'planning';
        el.projectForm.elements.priority.value = project.priority || 'medium';
        el.projectForm.elements.budget.value = project.budget || '';
        el.projectForm.elements.objectives.value = (project.objectives || []).join('; ');
        el.projectForm.elements.risks.value = (project.risks || []).join('; ');
        el.projectForm.elements.notes.value = project.notes || '';

        clearMilestoneRows();
        const milestones = project.milestones || [];
        milestones.forEach(m => addMilestoneRow(m.name, m.due_date, m.status));
    }

    function clearProjectForm() {
        if (!el.projectForm) return;
        el.projectForm.reset();
        el.projectForm.elements.project_id.value = '';
        clearMilestoneRows();
    }

    function buildProjectPayload(formData) {
        return {
            title: formData.get('title'),
            description: formData.get('description'),
            manager_name: formData.get('manager_name'),
            manager_email: formData.get('manager_email'),
            start_date: formData.get('start_date'),
            end_date: formData.get('end_date'),
            status: formData.get('status'),
            priority: formData.get('priority'),
            budget: Number(formData.get('budget') || 0),
            objectives: parseArrayField(formData.get('objectives')),
            milestones: getMilestonesFromForm(),
            risks: parseArrayField(formData.get('risks')),
            notes: formData.get('notes'),
        };
    }

    function renderPmDashboard() {
        const projects = state.projects;
        const total = projects.length;
        const active = projects.filter(p => p.status === 'active').length;
        const done = projects.filter(p => p.status === 'completed').length;
        const overdue = projects.reduce((sum, p) => sum + (p.task_overdue || 0), 0);

        if (el.pmKpiTotal) el.pmKpiTotal.textContent = total;
        if (el.pmKpiActive) el.pmKpiActive.textContent = active;
        if (el.pmKpiDone) el.pmKpiDone.textContent = done;
        if (el.pmKpiOverdue) el.pmKpiOverdue.textContent = overdue;

        renderPmAlerts();
        renderPmTimeline();
    }

    function renderPmAlerts() {
        if (!el.pmAlerts) return;
        const overdueProjects = state.projects.filter(p => (p.task_overdue || 0) > 0);
        if (!overdueProjects.length) {
            el.pmAlerts.hidden = true;
            el.pmAlerts.innerHTML = '';
            return;
        }

        let html = `<div class="pm-alert-title"><i class="fas fa-exclamation-triangle"></i> Tarefas Atrasadas Detectadas</div>`;
        overdueProjects.forEach(p => {
            html += `<div class="pm-alert-item">
                <span class="pm-alert-badge">${p.task_overdue} atrasada${p.task_overdue > 1 ? 's' : ''}</span>
                <span><strong>${escapeHtml(p.title)}</strong> — ${p.task_done}/${p.task_count} concluidas | Responsavel: ${escapeHtml(p.manager_name || 'Nao definido')}</span>
            </div>`;
        });
        el.pmAlerts.innerHTML = html;
        el.pmAlerts.hidden = false;
    }

    function renderPmTimeline() {
        if (!el.pmTimeline || !el.pmTimelineContainer) return;
        const projects = state.projects.filter(p => p.start_date && p.end_date);
        if (!projects.length) {
            el.pmTimelineContainer.hidden = true;
            return;
        }

        const allDates = [];
        projects.forEach(p => {
            allDates.push(p.start_date);
            allDates.push(p.end_date);
        });
        allDates.sort();
        const minDate = new Date(allDates[0] + 'T00:00:00');
        const maxDate = new Date(allDates[allDates.length - 1] + 'T00:00:00');
        const totalDays = Math.max(1, (maxDate - minDate) / (1000 * 60 * 60 * 24));

        let html = '';
        projects.forEach(p => {
            const start = new Date(p.start_date + 'T00:00:00');
            const end = new Date(p.end_date + 'T00:00:00');
            const leftPct = Math.max(0, ((start - minDate) / (1000 * 60 * 60 * 24)) / totalDays * 100);
            const widthPct = Math.max(2, ((end - start) / (1000 * 60 * 60 * 24)) / totalDays * 100);
            const tasks = state.projects === projects ? [] : [];
            const progress = p.task_count ? Math.round((p.task_done / p.task_count) * 100) : 0;

            let milestonesHtml = '';
            (p.milestones || []).forEach(m => {
                if (m.due_date) {
                    const mDate = new Date(m.due_date + 'T00:00:00');
                    const mPct = ((mDate - start) / (end - start)) * 100;
                    if (mPct >= 0 && mPct <= 100) {
                        milestonesHtml += `<div class="pm-timeline-milestone" style="left:${mPct}%" data-name="${escapeHtml(m.name)}"></div>`;
                    }
                }
            });

            html += `<div class="pm-timeline-row">
                <div class="pm-timeline-label">${escapeHtml(p.title)}<small>${fmtDate(p.start_date)} - ${fmtDate(p.end_date)}</small></div>
                <div class="pm-timeline-track">
                    <div class="pm-timeline-bar status-${p.status}" style="left:${leftPct}%;width:${widthPct}%">
                        <div class="pm-timeline-milestones">${milestonesHtml}</div>
                    </div>
                    <div class="pm-timeline-pct">${progress}%</div>
                </div>
            </div>`;
        });

        el.pmTimeline.innerHTML = html;
        el.pmTimelineContainer.hidden = false;
    }

    function renderProjects() {
        if (!el.projectsList) return;
        if (!state.projects.length) {
            el.projectsList.innerHTML = '<p>Nenhum projeto cadastrado ate o momento.</p>';
            return;
        }

        el.projectsList.innerHTML = state.projects.map(p => {
            const progress = p.task_count ? Math.round((p.task_done / p.task_count) * 100) : 0;
            const overdueHtml = (p.task_overdue || 0) > 0
                ? `<span class="pm-task-overdue-flag"><i class="fas fa-clock"></i> ${p.task_overdue} atrasada${p.task_overdue > 1 ? 's' : ''}</span>`
                : '';

            return `<div class="pm-project-card" data-project-id="${p.id}">
                <div class="pm-project-top">
                    <div>
                        <div class="pm-project-title">${escapeHtml(p.title)}</div>
                        <div class="pm-project-meta">
                            <span class="pm-badge pm-badge-${p.status}">${statusLabel(p.status)}</span>
                            <span class="pm-badge pm-badge-${p.priority}">${priorityLabel(p.priority)}</span>
                            ${overdueHtml}
                        </div>
                    </div>
                    <div class="plan-item-actions">
                        <button type="button" class="mini-btn" data-action="tasks"><i class="fas fa-tasks"></i> Tarefas</button>
                        <button type="button" class="mini-btn" data-action="edit">Editar</button>
                        <button type="button" class="mini-btn" data-action="delete">Excluir</button>
                        <button type="button" class="mini-btn" data-action="docx">DOCX</button>
                        <button type="button" class="mini-btn" data-action="pdf">PDF</button>
                        <button type="button" class="mini-btn" data-action="excel">Excel</button>
                    </div>
                </div>
                <div class="pm-project-info">
                    <div><strong>Responsavel:</strong> ${escapeHtml(p.manager_name || 'Nao definido')}</div>
                    <div><strong>Periodo:</strong> ${fmtDate(p.start_date)} ate ${fmtDate(p.end_date)}</div>
                    <div><strong>Orcamento:</strong> R$ ${(p.budget || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                    <div><strong>Tarefas:</strong> ${p.task_done || 0}/${p.task_count || 0} concluidas</div>
                </div>
                <div class="pm-progress-wrap">
                    <div class="pm-progress-bar-outer"><div class="pm-progress-bar-inner" style="width:${progress}%"></div></div>
                    <div class="pm-progress-text"><span>${progress}% concluido</span><span>${p.task_count || 0} tarefas</span></div>
                </div>
            </div>`;
        }).join('');
    }

    async function handleProjectSave(event) {
        event.preventDefault();
        const formData = new FormData(el.projectForm);
        const payload = buildProjectPayload(formData);
        const projectId = formData.get('project_id');

        try {
            if (projectId) {
                await request(`/projects/${projectId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                showToast('Projeto atualizado com sucesso.');
            } else {
                await request('/projects', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                showToast('Projeto criado com sucesso.');
            }

            clearProjectForm();
            await refreshProjects();
        } catch (error) {
            showToast(error.message, true);
        }
    }

    async function refreshProjects() {
        const response = await request('/projects', { method: 'GET' });
        state.projects = response.projects || [];
        renderProjects();
        renderPmDashboard();
    }

    async function handleProjectActions(event) {
        const target = event.target.closest('.mini-btn');
        if (!target) return;
        const action = target.dataset.action;
        if (!action) return;
        const wrapper = target.closest('.pm-project-card');
        if (!wrapper) return;
        const projectId = wrapper.getAttribute('data-project-id');
        const project = state.projects.find(item => String(item.id) === String(projectId));
        if (!project) return;

        try {
            if (action === 'edit') {
                fillProjectForm(project);
                showToast('Projeto carregado para edicao.');
                return;
            }
            if (action === 'delete') {
                if (!window.confirm('Deseja excluir este projeto e todas as suas tarefas?')) return;
                await request(`/projects/${project.id}`, { method: 'DELETE' });
                state.projects = state.projects.filter(item => item.id !== project.id);
                if (String(state.activeProjectId) === String(project.id)) {
                    closeTaskPanel();
                }
                renderProjects();
                renderPmDashboard();
                showToast('Projeto removido.');
                return;
            }
            if (action === 'tasks') {
                await openTaskPanel(project);
                return;
            }
            if (['docx', 'pdf', 'excel'].includes(action)) {
                const url = `${getApiBase()}/projects/${project.id}/export/${action}?token=${encodeURIComponent(state.token)}`;
                const anchor = document.createElement('a');
                anchor.href = url;
                anchor.target = '_blank';
                anchor.rel = 'noopener noreferrer';
                anchor.click();
                showToast(`Exportacao ${action.toUpperCase()} iniciada.`);
            }
        } catch (error) {
            showToast(error.message, true);
        }
    }

    /* ── Task Management ── */

    async function openTaskPanel(project) {
        state.activeProjectId = project.id;
        if (el.pmTaskProjectTitle) el.pmTaskProjectTitle.textContent = project.title;

        const milestones = project.milestones || [];
        if (el.taskMilestoneSelect) {
            el.taskMilestoneSelect.innerHTML = '<option value="">Sem vinculo</option>' +
                milestones.map(m => `<option value="${escapeHtml(m.name)}">${escapeHtml(m.name)}</option>`).join('');
        }

        try {
            const response = await request(`/projects/${project.id}/tasks`, { method: 'GET' });
            state.projectTasks = response.tasks || [];
        } catch (error) {
            state.projectTasks = [];
            showToast(error.message, true);
        }

        renderTasks();
        renderTaskKpis();
        if (el.pmTaskPanel) el.pmTaskPanel.hidden = false;
        el.pmTaskPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function closeTaskPanel() {
        state.activeProjectId = null;
        state.projectTasks = [];
        if (el.pmTaskPanel) el.pmTaskPanel.hidden = true;
        clearTaskForm();
    }

    function clearTaskForm() {
        if (!el.taskForm) return;
        el.taskForm.reset();
        el.taskForm.elements.task_id.value = '';
        el.taskForm.elements.task_project_id.value = '';
        if (el.taskForm.elements.task_progress) el.taskForm.elements.task_progress.value = '0';
    }

    function fillTaskForm(task) {
        if (!el.taskForm) return;
        el.taskForm.elements.task_id.value = task.id || '';
        el.taskForm.elements.task_project_id.value = task.project_id || '';
        el.taskForm.elements.task_title.value = task.title || '';
        el.taskForm.elements.task_description.value = task.description || '';
        el.taskForm.elements.task_milestone.value = task.milestone || '';
        el.taskForm.elements.task_assignee_name.value = task.assignee_name || '';
        el.taskForm.elements.task_assignee_email.value = task.assignee_email || '';
        el.taskForm.elements.task_start_date.value = task.start_date || '';
        el.taskForm.elements.task_due_date.value = task.due_date || '';
        el.taskForm.elements.task_status.value = task.status || 'todo';
        el.taskForm.elements.task_priority.value = task.priority || 'medium';
        el.taskForm.elements.task_progress.value = task.progress || 0;
    }

    function buildTaskPayload(formData) {
        return {
            title: formData.get('task_title'),
            description: formData.get('task_description'),
            milestone: formData.get('task_milestone'),
            assignee_name: formData.get('task_assignee_name'),
            assignee_email: formData.get('task_assignee_email'),
            start_date: formData.get('task_start_date'),
            due_date: formData.get('task_due_date'),
            status: formData.get('task_status'),
            priority: formData.get('task_priority'),
            progress: Number(formData.get('task_progress') || 0),
        };
    }

    function renderTaskKpis() {
        if (!el.pmTaskKpiRow) return;
        const tasks = state.projectTasks;
        const total = tasks.length;
        const done = tasks.filter(t => t.status === 'done').length;
        const inProgress = tasks.filter(t => t.status === 'in_progress').length;
        const overdue = tasks.filter(t => isOverdue(t)).length;
        const avgProgress = total ? Math.round(tasks.reduce((s, t) => s + (t.progress || 0), 0) / total) : 0;

        el.pmTaskKpiRow.innerHTML = `
            <div class="pm-task-kpi"><div class="pm-task-kpi-val">${total}</div><div class="pm-task-kpi-lbl">Total</div></div>
            <div class="pm-task-kpi"><div class="pm-task-kpi-val">${inProgress}</div><div class="pm-task-kpi-lbl">Em Andamento</div></div>
            <div class="pm-task-kpi"><div class="pm-task-kpi-val">${done}</div><div class="pm-task-kpi-lbl">Concluidas</div></div>
            <div class="pm-task-kpi"><div class="pm-task-kpi-val" style="${overdue > 0 ? 'color:#ff6b6b' : ''}">${overdue}</div><div class="pm-task-kpi-lbl">Atrasadas</div></div>
            <div class="pm-task-kpi"><div class="pm-task-kpi-val">${avgProgress}%</div><div class="pm-task-kpi-lbl">Progresso</div></div>
        `;
    }

    function renderTasks() {
        if (!el.pmTaskList) return;
        if (!state.projectTasks.length) {
            el.pmTaskList.innerHTML = '<p>Nenhuma tarefa cadastrada para este projeto.</p>';
            return;
        }

        el.pmTaskList.innerHTML = state.projectTasks.map(t => {
            const overdueFlag = isOverdue(t)
                ? `<span class="pm-task-overdue-flag"><i class="fas fa-clock"></i> Atrasada</span>`
                : '';
            return `<div class="pm-task-card" data-task-id="${t.id}">
                <div class="pm-task-indicator status-${t.status}"></div>
                <div class="pm-task-body">
                    <div class="pm-task-top-row">
                        <div>
                            <span class="pm-task-title">${escapeHtml(t.title)}</span>
                            ${overdueFlag}
                        </div>
                        <div class="plan-item-actions">
                            <span class="pm-badge pm-badge-${t.status}" style="font-size:0.68rem">${statusLabel(t.status)}</span>
                            <span class="pm-badge pm-badge-${t.priority}" style="font-size:0.68rem">${priorityLabel(t.priority)}</span>
                            <button type="button" class="mini-btn" data-action="edit-task">Editar</button>
                            <button type="button" class="mini-btn" data-action="delete-task">Excluir</button>
                        </div>
                    </div>
                    <div class="pm-task-detail-row">
                        <span><strong>Responsavel:</strong> ${escapeHtml(t.assignee_name || 'Nao definido')}</span>
                        <span><strong>Etapa:</strong> ${escapeHtml(t.milestone || 'Sem vinculo')}</span>
                        <span><strong>Prazo:</strong> ${fmtDate(t.due_date)}</span>
                        ${t.completed_date ? `<span><strong>Concluida:</strong> ${fmtDate(t.completed_date)}</span>` : ''}
                    </div>
                    <div class="pm-task-progress-row">
                        <div class="pm-task-progress-bar"><div class="pm-task-progress-fill" style="width:${t.progress || 0}%"></div></div>
                        <div class="pm-task-progress-text">${t.progress || 0}%</div>
                    </div>
                </div>
            </div>`;
        }).join('');
    }

    async function handleTaskSave(event) {
        event.preventDefault();
        if (!state.activeProjectId) {
            showToast('Selecione um projeto antes de adicionar tarefas.', true);
            return;
        }
        const formData = new FormData(el.taskForm);
        const payload = buildTaskPayload(formData);
        const taskId = formData.get('task_id');

        try {
            if (taskId) {
                await request(`/projects/${state.activeProjectId}/tasks/${taskId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                showToast('Tarefa atualizada com sucesso.');
            } else {
                await request(`/projects/${state.activeProjectId}/tasks`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                showToast('Tarefa criada com sucesso.');
            }

            clearTaskForm();
            const response = await request(`/projects/${state.activeProjectId}/tasks`, { method: 'GET' });
            state.projectTasks = response.tasks || [];
            renderTasks();
            renderTaskKpis();
            await refreshProjects();
        } catch (error) {
            showToast(error.message, true);
        }
    }

    async function handleTaskActions(event) {
        const target = event.target.closest('.mini-btn');
        if (!target) return;
        const action = target.dataset.action;
        if (!action) return;
        const wrapper = target.closest('.pm-task-card');
        if (!wrapper) return;
        const taskId = wrapper.getAttribute('data-task-id');
        const task = state.projectTasks.find(item => String(item.id) === String(taskId));
        if (!task) return;

        try {
            if (action === 'edit-task') {
                fillTaskForm(task);
                showToast('Tarefa carregada para edicao.');
                return;
            }
            if (action === 'delete-task') {
                if (!window.confirm('Deseja excluir esta tarefa?')) return;
                await request(`/projects/${state.activeProjectId}/tasks/${task.id}`, { method: 'DELETE' });
                state.projectTasks = state.projectTasks.filter(item => item.id !== task.id);
                renderTasks();
                renderTaskKpis();
                await refreshProjects();
                showToast('Tarefa removida.');
            }
        } catch (error) {
            showToast(error.message, true);
        }
    }

    function clearWidgetForm() {
        if (!el.widgetForm) {
            return;
        }

        el.widgetForm.reset();
        el.widgetForm.elements.widget_id.value = '';
        el.widgetForm.elements.current_media_path.value = '';
        if (el.widgetForm.elements.is_active) {
            el.widgetForm.elements.is_active.checked = true;
        }
        if (el.widgetForm.elements.display_order) {
            el.widgetForm.elements.display_order.value = '0';
        }
        setWidgetPreview('', '');
        syncWidgetFieldVisibility();
    }

    function fillWidgetForm(widget) {
        if (!el.widgetForm || !widget) {
            return;
        }

        el.widgetForm.elements.widget_id.value = widget.id || '';
        el.widgetForm.elements.current_media_path.value = widget.media_path || '';
        el.widgetForm.elements.name.value = widget.name || '';
        el.widgetForm.elements.title.value = widget.title || '';
        el.widgetForm.elements.placement.value = widget.placement || 'top_banner';
        el.widgetForm.elements.scope.value = widget.scope || 'all';
        el.widgetForm.elements.widget_type.value = widget.widget_type || 'image';
        el.widgetForm.elements.target_url.value = widget.target_url || '';
        el.widgetForm.elements.alt_text.value = widget.alt_text || '';
        el.widgetForm.elements.embed_code.value = widget.embed_code || '';
        el.widgetForm.elements.display_order.value = widget.display_order || 0;
        el.widgetForm.elements.is_active.checked = Boolean(widget.is_active);
        syncWidgetFieldVisibility();
        setWidgetPreview(widget.media_url || '', widget.alt_text || widget.name || 'Preview do widget');
    }

    async function refreshWidgets() {
        const response = await request('/widgets', { method: 'GET' });
        state.widgets = response.widgets || [];
        renderWidgets();
    }

    async function uploadWidgetMediaIfNeeded() {
        if (!el.widgetMediaFile || !el.widgetMediaFile.files || !el.widgetMediaFile.files.length) {
            return null;
        }

        const payload = new FormData();
        payload.append('media', el.widgetMediaFile.files[0]);
        return request('/widgets/media', {
            method: 'POST',
            body: payload,
        });
    }

    function buildWidgetPayload(formData, uploadedMedia) {
        const widgetType = formData.get('widget_type');
        return {
            name: formData.get('name'),
            title: formData.get('title'),
            placement: formData.get('placement'),
            scope: formData.get('scope'),
            widget_type: widgetType,
            media_path: uploadedMedia && uploadedMedia.media_path
                ? uploadedMedia.media_path
                : formData.get('current_media_path'),
            target_url: formData.get('target_url'),
            alt_text: formData.get('alt_text'),
            embed_code: widgetType === 'code' ? formData.get('embed_code') : '',
            display_order: Number(formData.get('display_order') || 0),
            is_active: formData.get('is_active') === 'on',
        };
    }

    async function loadDashboard() {
        const me = await request('/me', { method: 'GET' });
        state.company = me.company;
        fillCompanyForm(me.company);

        const plansResponse = await request('/plans', { method: 'GET' });
        state.plans = plansResponse.plans || [];
        renderPlans();

        const swotResponse = await request('/swot-analyses', { method: 'GET' });
        state.swotAnalyses = swotResponse.analyses || [];
        renderSwotAnalyses();

        const businessPlansResponse = await request('/business-plans', { method: 'GET' });
        state.businessPlans = businessPlansResponse.business_plans || [];
        renderBusinessPlans();

        const feasibilityResponse = await request('/feasibility-studies', { method: 'GET' });
        state.feasibilityStudies = feasibilityResponse.feasibility_studies || [];
        renderFeasibilityStudies();

        const projectsResponse = await request('/projects', { method: 'GET' });
        state.projects = projectsResponse.projects || [];
        renderProjects();
        renderPmDashboard();

        await refreshWidgets();
        setLoggedIn(true);
    }

    async function handleLogin(event) {
        event.preventDefault();
        const formData = new FormData(el.loginForm);

        try {
            const payload = {
                email: formData.get('email'),
                password: formData.get('password'),
            };
            const data = await request('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            state.token = data.token;
            localStorage.setItem('idialog-tools-token', state.token);
            await loadDashboard();
            showToast('Login realizado com sucesso.');
        } catch (error) {
            showToast(error.message, true);
        }
    }

    async function handleRegister(event) {
        event.preventDefault();
        const formData = new FormData(el.registerForm);

        const password = formData.get('admin_password');
        const confirmPassword = formData.get('admin_password_confirm');

        if (password !== confirmPassword) {
            showToast('As senhas não coincidem.', true);
            return;
        }

        if (password.length < 6) {
            showToast('A senha deve ter pelo menos 6 caracteres.', true);
            return;
        }

        try {
            const payload = {
                company: {
                    name: formData.get('company_name'),
                    cnpj: formData.get('cnpj'),
                    email: formData.get('company_email'),
                    phone: formData.get('company_phone'),
                    address: formData.get('company_address'),
                },
                admin: {
                    name: formData.get('admin_name'),
                    email: formData.get('admin_email'),
                    password: formData.get('admin_password'),
                },
            };

            const data = await request('/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            state.token = data.token;
            localStorage.setItem('idialog-tools-token', state.token);

            const logoInput = el.registerLogoFile;
            if (logoInput && logoInput.files && logoInput.files.length) {
                const logoPayload = new FormData();
                logoPayload.append('logo', logoInput.files[0]);
                await request('/company/logo', {
                    method: 'POST',
                    body: logoPayload,
                });
            }

            await loadDashboard();
            showToast('Empresa cadastrada e autenticada.');
        } catch (error) {
            showToast(error.message, true);
        }
    }

    async function handleCompanySave(event) {
        event.preventDefault();
        const formData = new FormData(el.companyForm);

        try {
            const payload = {
                name: formData.get('name'),
                cnpj: formData.get('cnpj'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                address: formData.get('address'),
                header_text: formData.get('header_text'),
                footer_text: formData.get('footer_text'),
            };

            const data = await request('/company', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            state.company = data.company;
            fillCompanyForm(data.company);
            showToast('Informacoes da empresa atualizadas.');
        } catch (error) {
            showToast(error.message, true);
        }
    }

    async function handleLogoUpload(event) {
        event.preventDefault();
        const fileInput = document.getElementById('logo-file');
        if (!fileInput || !fileInput.files || !fileInput.files.length) {
            showToast('Selecione uma imagem de logo.', true);
            return;
        }

        try {
            const payload = new FormData();
            payload.append('logo', fileInput.files[0]);

            const data = await request('/company/logo', {
                method: 'POST',
                body: payload,
            });

            state.company = data.company;
            fillCompanyForm(data.company);
            showToast('Logo enviada com sucesso.');
            el.logoForm.reset();
        } catch (error) {
            showToast(error.message, true);
        }
    }

    function buildPlanPayload(formData) {
        return {
            title: formData.get('title'),
            period_start: formData.get('period_start'),
            period_end: formData.get('period_end'),
            mission: formData.get('mission'),
            vision: formData.get('vision'),
            values: parseArrayField(formData.get('values')),
            swot_strengths: parseArrayField(formData.get('swot_strengths')),
            swot_weaknesses: parseArrayField(formData.get('swot_weaknesses')),
            swot_opportunities: parseArrayField(formData.get('swot_opportunities')),
            swot_threats: parseArrayField(formData.get('swot_threats')),
            objectives: parseArrayField(formData.get('objectives')),
            initiatives: parseArrayField(formData.get('initiatives')),
            indicators: parseArrayField(formData.get('indicators')),
        };
    }

    async function handlePlanSave(event) {
        event.preventDefault();
        const formData = new FormData(el.planForm);
        const payload = buildPlanPayload(formData);
        const planId = formData.get('plan_id');

        try {
            if (planId) {
                await request(`/plans/${planId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                showToast('Planejamento atualizado com sucesso.');
            } else {
                await request('/plans', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                showToast('Planejamento criado com sucesso.');
            }

            clearPlanForm();
            const plansResponse = await request('/plans', { method: 'GET' });
            state.plans = plansResponse.plans || [];
            renderPlans();
        } catch (error) {
            showToast(error.message, true);
        }
    }

    async function handlePlanActions(event) {
        const target = event.target;
        if (!(target instanceof HTMLButtonElement)) {
            return;
        }

        const action = target.dataset.action;
        if (!action) {
            return;
        }

        const wrapper = target.closest('.plan-item');
        if (!wrapper) {
            return;
        }

        const planId = wrapper.getAttribute('data-plan-id');
        const plan = state.plans.find(item => String(item.id) === String(planId));
        if (!plan) {
            return;
        }

        try {
            if (action === 'edit') {
                fillPlanForm(plan);
                showToast('Planejamento carregado para edicao.');
                return;
            }

            if (action === 'delete') {
                const confirmed = window.confirm('Deseja excluir este planejamento?');
                if (!confirmed) {
                    return;
                }
                await request(`/plans/${plan.id}`, { method: 'DELETE' });
                state.plans = state.plans.filter(item => item.id !== plan.id);
                renderPlans();
                showToast('Planejamento removido.');
                return;
            }

            if (['docx', 'pdf', 'excel'].includes(action)) {
                const url = `${getApiBase()}/plans/${plan.id}/export/${action}?token=${encodeURIComponent(state.token)}`;
                const anchor = document.createElement('a');
                anchor.href = url;
                anchor.target = '_blank';
                anchor.rel = 'noopener noreferrer';
                anchor.click();
                showToast(`Exportacao ${action.toUpperCase()} iniciada.`);
            }
        } catch (error) {
            showToast(error.message, true);
        }
    }

    function buildSwotPayload(formData) {
        return {
            title: formData.get('title'),
            analysis_date: formData.get('analysis_date'),
            business_unit: formData.get('business_unit'),
            period_start: formData.get('period_start'),
            period_end: formData.get('period_end'),
            analysis_objective: formData.get('analysis_objective'),
            strengths: parseArrayField(formData.get('strengths')),
            weaknesses: parseArrayField(formData.get('weaknesses')),
            opportunities: parseArrayField(formData.get('opportunities')),
            threats: parseArrayField(formData.get('threats')),
            so_strategies: parseArrayField(formData.get('so_strategies')),
            wo_strategies: parseArrayField(formData.get('wo_strategies')),
            st_strategies: parseArrayField(formData.get('st_strategies')),
            wt_strategies: parseArrayField(formData.get('wt_strategies')),
            priority_actions: parseArrayField(formData.get('priority_actions')),
            critical_risks: parseArrayField(formData.get('critical_risks')),
            executive_summary: formData.get('executive_summary'),
        };
    }

    async function handleSwotSave(event) {
        event.preventDefault();
        const formData = new FormData(el.swotForm);
        const payload = buildSwotPayload(formData);
        const swotId = formData.get('swot_id');

        try {
            if (swotId) {
                await request(`/swot-analyses/${swotId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                showToast('Analise SWOT atualizada com sucesso.');
            } else {
                await request('/swot-analyses', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                showToast('Analise SWOT criada com sucesso.');
            }

            clearSwotForm();
            const swotResponse = await request('/swot-analyses', { method: 'GET' });
            state.swotAnalyses = swotResponse.analyses || [];
            renderSwotAnalyses();
        } catch (error) {
            showToast(error.message, true);
        }
    }

    async function handleSwotActions(event) {
        const target = event.target;
        if (!(target instanceof HTMLButtonElement)) {
            return;
        }

        const action = target.dataset.action;
        if (!action) {
            return;
        }

        const wrapper = target.closest('.plan-item');
        if (!wrapper) {
            return;
        }

        const swotId = wrapper.getAttribute('data-swot-id');
        const swot = state.swotAnalyses.find(item => String(item.id) === String(swotId));
        if (!swot) {
            return;
        }

        try {
            if (action === 'edit') {
                fillSwotForm(swot);
                showToast('Analise SWOT carregada para edicao.');
                return;
            }

            if (action === 'delete') {
                const confirmed = window.confirm('Deseja excluir esta analise SWOT?');
                if (!confirmed) {
                    return;
                }
                await request(`/swot-analyses/${swot.id}`, { method: 'DELETE' });
                state.swotAnalyses = state.swotAnalyses.filter(item => item.id !== swot.id);
                renderSwotAnalyses();
                showToast('Analise SWOT removida.');
                return;
            }

            if (['docx', 'pdf', 'excel'].includes(action)) {
                const url = `${getApiBase()}/swot-analyses/${swot.id}/export/${action}?token=${encodeURIComponent(state.token)}`;
                const anchor = document.createElement('a');
                anchor.href = url;
                anchor.target = '_blank';
                anchor.rel = 'noopener noreferrer';
                anchor.click();
                showToast(`Exportacao SWOT ${action.toUpperCase()} iniciada.`);
            }
        } catch (error) {
            showToast(error.message, true);
        }
    }

    function buildBusinessPlanPayload(formData) {
        return {
            title: formData.get('title'),
            industry: formData.get('industry'),
            target_market: formData.get('target_market'),
            period_start: formData.get('period_start'),
            period_end: formData.get('period_end'),
            executive_summary: formData.get('executive_summary'),
            problem_statement: formData.get('problem_statement'),
            value_proposition: formData.get('value_proposition'),
            products_services: parseArrayField(formData.get('products_services')),
            market_analysis: formData.get('market_analysis'),
            marketing_strategy: formData.get('marketing_strategy'),
            operational_plan: formData.get('operational_plan'),
            revenue_streams: parseArrayField(formData.get('revenue_streams')),
            cost_structure: parseArrayField(formData.get('cost_structure')),
            investment_requirements: parseArrayField(formData.get('investment_requirements')),
            financial_projections: parseArrayField(formData.get('financial_projections')),
            team_structure: parseArrayField(formData.get('team_structure')),
            milestones: parseArrayField(formData.get('milestones')),
            risks_mitigation: parseArrayField(formData.get('risks_mitigation')),
        };
    }

    async function handleBusinessPlanSave(event) {
        event.preventDefault();
        const formData = new FormData(el.businessPlanForm);
        const payload = buildBusinessPlanPayload(formData);
        const businessPlanId = formData.get('business_plan_id');

        try {
            if (businessPlanId) {
                await request(`/business-plans/${businessPlanId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                showToast('Plano de negocios atualizado com sucesso.');
            } else {
                await request('/business-plans', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                showToast('Plano de negocios criado com sucesso.');
            }

            clearBusinessPlanForm();
            const businessPlansResponse = await request('/business-plans', { method: 'GET' });
            state.businessPlans = businessPlansResponse.business_plans || [];
            renderBusinessPlans();
        } catch (error) {
            showToast(error.message, true);
        }
    }

    async function handleBusinessPlanActions(event) {
        const target = event.target;
        if (!(target instanceof HTMLButtonElement)) {
            return;
        }

        const action = target.dataset.action;
        if (!action) {
            return;
        }

        const wrapper = target.closest('.plan-item');
        if (!wrapper) {
            return;
        }

        const businessPlanId = wrapper.getAttribute('data-business-plan-id');
        const businessPlan = state.businessPlans.find(item => String(item.id) === String(businessPlanId));
        if (!businessPlan) {
            return;
        }

        try {
            if (action === 'edit') {
                fillBusinessPlanForm(businessPlan);
                showToast('Plano de negocios carregado para edicao.');
                return;
            }

            if (action === 'delete') {
                const confirmed = window.confirm('Deseja excluir este plano de negocios?');
                if (!confirmed) {
                    return;
                }
                await request(`/business-plans/${businessPlan.id}`, { method: 'DELETE' });
                state.businessPlans = state.businessPlans.filter(item => item.id !== businessPlan.id);
                renderBusinessPlans();
                showToast('Plano de negocios removido.');
                return;
            }

            if (['docx', 'pdf', 'excel'].includes(action)) {
                const url = `${getApiBase()}/business-plans/${businessPlan.id}/export/${action}?token=${encodeURIComponent(state.token)}`;
                const anchor = document.createElement('a');
                anchor.href = url;
                anchor.target = '_blank';
                anchor.rel = 'noopener noreferrer';
                anchor.click();
                showToast(`Exportacao plano de negocios ${action.toUpperCase()} iniciada.`);
            }
        } catch (error) {
            showToast(error.message, true);
        }
    }

    function buildFeasibilityPayload(formData) {
        return {
            title: formData.get('title'),
            project_type: formData.get('project_type'),
            sector: formData.get('sector'),
            sponsor: formData.get('sponsor'),
            location: formData.get('location'),
            analysis_date: formData.get('analysis_date'),
            horizon_years: Number(formData.get('horizon_years') || 0),
            capex_estimate: Number(formData.get('capex_estimate') || 0),
            opex_estimate: Number(formData.get('opex_estimate') || 0),
            technical_scope: formData.get('technical_scope'),
            technical_requirements: parseArrayField(formData.get('technical_requirements')),
            engineering_solution: formData.get('engineering_solution'),
            technology_readiness: formData.get('technology_readiness'),
            implementation_schedule: formData.get('implementation_schedule'),
            resource_plan: parseArrayField(formData.get('resource_plan')),
            regulatory_licensing: formData.get('regulatory_licensing'),
            environmental_social: formData.get('environmental_social'),
            demand_assumptions: formData.get('demand_assumptions'),
            pricing_model: formData.get('pricing_model'),
            revenue_assumptions: parseArrayField(formData.get('revenue_assumptions')),
            cost_assumptions: parseArrayField(formData.get('cost_assumptions')),
            financing_structure: formData.get('financing_structure'),
            wacc_assumption: formData.get('wacc_assumption'),
            cash_flow_projection: formData.get('cash_flow_projection'),
            economic_indicators: parseArrayField(formData.get('economic_indicators')),
            sensitivity_analysis: formData.get('sensitivity_analysis'),
            scenario_analysis: formData.get('scenario_analysis'),
            key_risks: parseArrayField(formData.get('key_risks')),
            risk_response_plan: formData.get('risk_response_plan'),
            final_recommendation: formData.get('final_recommendation'),
        };
    }

    async function handleFeasibilitySave(event) {
        event.preventDefault();
        const formData = new FormData(el.feasibilityForm);
        const payload = buildFeasibilityPayload(formData);
        const feasibilityId = formData.get('feasibility_id');

        try {
            if (feasibilityId) {
                await request(`/feasibility-studies/${feasibilityId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                showToast('Estudo de viabilidade atualizado com sucesso.');
            } else {
                await request('/feasibility-studies', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                showToast('Estudo de viabilidade criado com sucesso.');
            }

            clearFeasibilityForm();
            const feasibilityResponse = await request('/feasibility-studies', { method: 'GET' });
            state.feasibilityStudies = feasibilityResponse.feasibility_studies || [];
            renderFeasibilityStudies();
        } catch (error) {
            showToast(error.message, true);
        }
    }

    async function handleFeasibilityActions(event) {
        const target = event.target;
        if (!(target instanceof HTMLButtonElement)) {
            return;
        }

        const action = target.dataset.action;
        if (!action) {
            return;
        }

        const wrapper = target.closest('.plan-item');
        if (!wrapper) {
            return;
        }

        const feasibilityId = wrapper.getAttribute('data-feasibility-id');
        const study = state.feasibilityStudies.find(item => String(item.id) === String(feasibilityId));
        if (!study) {
            return;
        }

        try {
            if (action === 'edit') {
                fillFeasibilityForm(study);
                showToast('Estudo de viabilidade carregado para edicao.');
                return;
            }

            if (action === 'delete') {
                const confirmed = window.confirm('Deseja excluir este estudo de viabilidade?');
                if (!confirmed) {
                    return;
                }
                await request(`/feasibility-studies/${study.id}`, { method: 'DELETE' });
                state.feasibilityStudies = state.feasibilityStudies.filter(item => item.id !== study.id);
                renderFeasibilityStudies();
                showToast('Estudo de viabilidade removido.');
                return;
            }

            if (['docx', 'pdf', 'excel'].includes(action)) {
                const url = `${getApiBase()}/feasibility-studies/${study.id}/export/${action}?token=${encodeURIComponent(state.token)}`;
                const anchor = document.createElement('a');
                anchor.href = url;
                anchor.target = '_blank';
                anchor.rel = 'noopener noreferrer';
                anchor.click();
                showToast(`Exportacao viabilidade ${action.toUpperCase()} iniciada.`);
            }
        } catch (error) {
            showToast(error.message, true);
        }
    }

    async function handleWidgetSave(event) {
        event.preventDefault();
        const formData = new FormData(el.widgetForm);
        const widgetId = formData.get('widget_id');

        try {
            const uploadedMedia = await uploadWidgetMediaIfNeeded();
            const payload = buildWidgetPayload(formData, uploadedMedia);

            if (widgetId) {
                await request(`/widgets/${widgetId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                showToast('Widget atualizado com sucesso.');
            } else {
                await request('/widgets', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                showToast('Widget criado com sucesso.');
            }

            clearWidgetForm();
            await refreshWidgets();
        } catch (error) {
            showToast(error.message, true);
        }
    }

    async function handleWidgetActions(event) {
        const target = event.target;
        if (!(target instanceof HTMLButtonElement)) {
            return;
        }

        const action = target.dataset.action;
        if (!action) {
            return;
        }

        const wrapper = target.closest('.widget-item');
        if (!wrapper) {
            return;
        }

        const widgetId = wrapper.getAttribute('data-widget-id');
        const widget = state.widgets.find(item => String(item.id) === String(widgetId));
        if (!widget) {
            return;
        }

        try {
            if (action === 'edit') {
                fillWidgetForm(widget);
                showToast('Widget carregado para edicao.');
                return;
            }

            if (action === 'toggle') {
                await request(`/widgets/${widget.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: widget.name,
                        title: widget.title,
                        placement: widget.placement,
                        scope: widget.scope,
                        widget_type: widget.widget_type,
                        media_path: widget.media_path,
                        target_url: widget.target_url,
                        alt_text: widget.alt_text,
                        embed_code: widget.embed_code,
                        display_order: widget.display_order,
                        is_active: !widget.is_active,
                    }),
                });
                await refreshWidgets();
                showToast(widget.is_active ? 'Widget pausado.' : 'Widget ativado.');
                return;
            }

            if (action === 'delete') {
                const confirmed = window.confirm('Deseja excluir este widget publicitario?');
                if (!confirmed) {
                    return;
                }
                await request(`/widgets/${widget.id}`, { method: 'DELETE' });
                if (String(el.widgetForm.elements.widget_id.value) === String(widget.id)) {
                    clearWidgetForm();
                }
                await refreshWidgets();
                showToast('Widget excluido.');
            }
        } catch (error) {
            showToast(error.message, true);
        }
    }

    async function restoreSession() {
        if (!state.token) {
            setLoggedIn(false);
            return;
        }

        try {
            await loadDashboard();
        } catch (error) {
            state.token = '';
            localStorage.removeItem('idialog-tools-token');
            setLoggedIn(false);
        }
    }

    function handleTabSwitch(event) {
        const trigger = event.target;
        if (!(trigger instanceof HTMLButtonElement) || !trigger.dataset.tab) {
            return;
        }

        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        trigger.classList.add('active');

        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        const tabId = `tab-${trigger.dataset.tab}`;
        const tabContent = document.getElementById(tabId);
        if (tabContent) {
            tabContent.classList.add('active');
        }
    }

    function handleLogout() {
        state.token = '';
        state.plans = [];
        state.swotAnalyses = [];
        state.businessPlans = [];
        state.feasibilityStudies = [];
        state.projects = [];
        state.projectTasks = [];
        state.activeProjectId = null;
        state.widgets = [];
        state.company = null;
        localStorage.removeItem('idialog-tools-token');
        setLoggedIn(false);
        showToast('Sessao encerrada.');
    }

    /* ===========================
       Auth UI Helpers
    =========================== */

    function initAuthTabs() {
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', () => switchAuthTab(tab.dataset.authTab));
        });
        document.querySelectorAll('[data-auth-go]').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                switchAuthTab(link.dataset.authGo);
            });
        });
    }

    function switchAuthTab(target) {
        document.querySelectorAll('.auth-tab').forEach(t => {
            const isActive = t.dataset.authTab === target;
            t.classList.toggle('active', isActive);
            t.setAttribute('aria-selected', isActive);
        });
        document.querySelectorAll('.auth-panel').forEach(p => p.classList.remove('active'));
        const panel = document.getElementById('auth-' + target + '-panel');
        if (panel) panel.classList.add('active');
    }

    function initPasswordToggles() {
        document.querySelectorAll('.pwd-toggle').forEach(btn => {
            btn.addEventListener('click', () => {
                const wrap = btn.closest('.input-password-wrap');
                const input = wrap.querySelector('input');
                const icon = btn.querySelector('i');
                const isPassword = input.type === 'password';
                input.type = isPassword ? 'text' : 'password';
                icon.className = isPassword ? 'fas fa-eye-slash' : 'fas fa-eye';
                btn.classList.toggle('visible', isPassword);
                btn.setAttribute('aria-label', isPassword ? 'Ocultar senha' : 'Mostrar senha');
            });
        });
    }

    function initPasswordStrength() {
        const pwdInput = document.getElementById('reg-password');
        const strengthEl = document.getElementById('pwd-strength');
        if (!pwdInput || !strengthEl) return;

        pwdInput.addEventListener('input', () => {
            const val = pwdInput.value;
            let score = 0;
            if (val.length >= 6) score++;
            if (val.length >= 8) score++;
            if (/[A-Z]/.test(val)) score++;
            if (/[0-9]/.test(val)) score++;
            if (/[^A-Za-z0-9]/.test(val)) score++;

            const levels = [
                { pct: '0%', color: 'rgba(255,255,255,0.08)', label: '' },
                { pct: '20%', color: '#ff5050', label: 'Fraca' },
                { pct: '40%', color: '#ff9040', label: 'Regular' },
                { pct: '60%', color: '#ffd740', label: 'Média' },
                { pct: '80%', color: '#69f0ae', label: 'Forte' },
                { pct: '100%', color: '#00e5ff', label: 'Excelente' },
            ];
            const level = levels[score] || levels[0];
            strengthEl.style.setProperty('--strength', level.pct);
            strengthEl.style.setProperty('--strength-color', level.color);
            const labelEl = strengthEl.querySelector('.pwd-strength-label');
            if (labelEl) labelEl.textContent = level.label;
            checkPasswordMatch();
        });
    }

    function initPasswordMatch() {
        const confirmInput = document.getElementById('reg-password-confirm');
        if (!confirmInput) return;
        confirmInput.addEventListener('input', checkPasswordMatch);
    }

    function checkPasswordMatch() {
        const pwd = document.getElementById('reg-password');
        const confirm = document.getElementById('reg-password-confirm');
        const msg = document.getElementById('pwd-match-msg');
        if (!pwd || !confirm || !msg) return;
        if (!confirm.value) {
            msg.textContent = '';
            msg.className = 'field-help pwd-match-msg';
            return;
        }
        if (pwd.value === confirm.value) {
            msg.textContent = '✓ Senhas coincidem';
            msg.className = 'field-help pwd-match-msg match';
        } else {
            msg.textContent = '✗ Senhas não coincidem';
            msg.className = 'field-help pwd-match-msg no-match';
        }
    }

    function initCnpjMask() {
        const cnpjInput = document.getElementById('cnpj-input');
        if (!cnpjInput) return;
        cnpjInput.addEventListener('input', () => {
            let v = cnpjInput.value.replace(/\D/g, '').slice(0, 14);
            if (v.length > 12) v = v.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, '$1.$2.$3/$4-$5');
            else if (v.length > 8) v = v.replace(/^(\d{2})(\d{3})(\d{3})(\d{0,4})/, '$1.$2.$3/$4');
            else if (v.length > 5) v = v.replace(/^(\d{2})(\d{3})(\d{0,3})/, '$1.$2.$3');
            else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,3})/, '$1.$2');
            cnpjInput.value = v;
        });
    }

    function initPhoneMask() {
        const phoneInput = document.getElementById('phone-input');
        if (!phoneInput) return;
        phoneInput.addEventListener('input', () => {
            let v = phoneInput.value.replace(/\D/g, '').slice(0, 11);
            if (v.length > 6) v = v.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
            else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
            phoneInput.value = v;
        });
    }

    function initApiConfig() {
        if (el.apiConfigToggle) {
            el.apiConfigToggle.addEventListener('click', () => {
                const panel = el.apiConfigPanel;
                panel.hidden = !panel.hidden;
                if (!panel.hidden && el.apiUrlInput) {
                    el.apiUrlInput.value = state.apiBase === '/api' ? '' : state.apiBase;
                }
            });
        }
        if (el.apiSaveBtn) {
            el.apiSaveBtn.addEventListener('click', handleApiSave);
        }
    }

    async function handleApiSave() {
        const url = (el.apiUrlInput.value || '').trim().replace(/\/+$/, '');
        if (!url) {
            showToast('Informe a URL do servidor.', true);
            return;
        }
        el.apiStatus.textContent = 'Verificando...';
        el.apiStatus.className = 'api-status';
        try {
            const resp = await fetch(url + '/health', { method: 'GET' });
            if (!resp.ok) throw new Error('Status ' + resp.status);
            const data = await resp.json();
            if (data.status === 'ok') {
                state.apiBase = url;
                localStorage.setItem('idialog-tools-api', url);
                el.apiStatus.textContent = '✓ Conectado';
                el.apiStatus.className = 'api-status ok';
                showToast('Servidor conectado com sucesso.');
            } else {
                throw new Error('Resposta inesperada');
            }
        } catch (e) {
            el.apiStatus.textContent = '✗ Falha na conexão';
            el.apiStatus.className = 'api-status error';
            showToast('Não foi possível conectar ao servidor. Verifique a URL.', true);
        }
    }

    async function autoDetectApi() {
        if (state.apiBase !== '/api') return;
        if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return;
        try {
            const resp = await fetch('/api/health', { method: 'GET' });
            if (resp.ok) return;
        } catch (_) {}
        if (el.apiConfigPanel) {
            el.apiConfigPanel.hidden = false;
            if (el.apiStatus) {
                el.apiStatus.textContent = '⚠ Configure o servidor para continuar';
                el.apiStatus.className = 'api-status error';
            }
        }
    }

    function bindEvents() {
        el.loginForm.addEventListener('submit', handleLogin);
        el.registerForm.addEventListener('submit', handleRegister);
        el.companyForm.addEventListener('submit', handleCompanySave);
        el.logoForm.addEventListener('submit', handleLogoUpload);
        el.planForm.addEventListener('submit', handlePlanSave);
        el.planReset.addEventListener('click', clearPlanForm);
        el.plansList.addEventListener('click', handlePlanActions);
        el.swotForm.addEventListener('submit', handleSwotSave);
        el.swotReset.addEventListener('click', clearSwotForm);
        el.swotList.addEventListener('click', handleSwotActions);
        el.businessPlanForm.addEventListener('submit', handleBusinessPlanSave);
        el.businessPlanReset.addEventListener('click', clearBusinessPlanForm);
        el.businessPlansList.addEventListener('click', handleBusinessPlanActions);
        el.feasibilityForm.addEventListener('submit', handleFeasibilitySave);
        el.feasibilityReset.addEventListener('click', clearFeasibilityForm);
        el.feasibilityList.addEventListener('click', handleFeasibilityActions);
        el.projectForm.addEventListener('submit', handleProjectSave);
        el.projectReset.addEventListener('click', clearProjectForm);
        el.projectsList.addEventListener('click', handleProjectActions);
        el.pmAddMilestone.addEventListener('click', () => addMilestoneRow('', '', 'pending'));
        el.pmCloseTasks.addEventListener('click', closeTaskPanel);
        el.taskForm.addEventListener('submit', handleTaskSave);
        el.taskReset.addEventListener('click', clearTaskForm);
        el.pmTaskList.addEventListener('click', handleTaskActions);
        el.widgetForm.addEventListener('submit', handleWidgetSave);
        el.widgetReset.addEventListener('click', clearWidgetForm);
        el.widgetsList.addEventListener('click', handleWidgetActions);
        el.widgetType.addEventListener('change', syncWidgetFieldVisibility);
        el.logoutBtn.addEventListener('click', handleLogout);

        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', handleTabSwitch);
        });
    }

    function init() {
        syncWidgetFieldVisibility();
        bindEvents();
        initAuthTabs();
        initPasswordToggles();
        initPasswordStrength();
        initPasswordMatch();
        initCnpjMask();
        initPhoneMask();
        initApiConfig();
        restoreSession();
        autoDetectApi();
    }

    document.addEventListener('DOMContentLoaded', init);
})();
